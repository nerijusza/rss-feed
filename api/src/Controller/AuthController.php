<?php
declare(strict_types=1);

namespace App\Controller;

use App\Auth\UserData;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AuthController extends AbstractController
{
    private SerializerInterface $serializer;
    private ValidatorInterface $validator;
    private UserPasswordEncoderInterface $userPasswordEncoder;
    private UserRepository $userRepository;

    public function __construct(
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        UserPasswordEncoderInterface $userPasswordEncoder,
        UserRepository $userRepository
    ) {
        $this->serializer = $serializer;
        $this->validator = $validator;
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/auth/register", methods={"POST"})
     *
     * @return JsonResponse
     */
    public function register(Request $request) {

        try {
            $userData = $this->getUserData($request);

            $this->checkForExistingEmail($userData->getEmail());

            $user = new User($userData->getEmail());
            $encodedPassword = $this->userPasswordEncoder->encodePassword($user, $userData->getPassword());

            $this->userRepository->upgradePassword($user, $encodedPassword);
        } catch (\Exception $e) {
            return new JsonResponse(["error" => $e->getMessage()], 500);
        }
        return new JsonResponse(["success" => $user->getUsername(). " has been registered!"]);
    }

    private function getUserData(Request $request): UserData
    {
        $newUser = $this->serializer->deserialize($request->getContent(), UserData::class, 'json');

        $violations = $this->validator->validate($newUser);
        if ($violations->count()) {
            $errors = array_map(
                function (ConstraintViolationInterface $violation): string
                {
                    return $violation->getPropertyPath() . ': ' .$violation->getMessage();
                },
                iterator_to_array($violations)
            );

            throw new \InvalidArgumentException(implode(' | ', $errors));
        }

        return $newUser;
    }

    private function checkForExistingEmail(string $email): void
    {
        if ($this->userRepository->findByEmail($email)) {
            throw new \InvalidArgumentException('Email already registered, please login');
        }
    }
}
