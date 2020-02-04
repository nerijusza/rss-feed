<?php
declare(strict_types=1);

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ValidationController extends AbstractController
{
    private ValidatorInterface $validator;
    private UserRepository $userRepository;

    public function __construct(ValidatorInterface $validator, UserRepository $userRepository) {
        $this->validator = $validator;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/validate/email/{email}", methods={"GET"})
     *
     * @return JsonResponse
     */
    public function validate(string $email):JsonResponse
    {
        if ($this->validator->validate($email, new Assert\Email())->count()) {
            return new JsonResponse(['valid' => false]);
        }

        if ($this->userRepository->findByEmail($email)) {
            return new JsonResponse(['valid' => false]);
        }

        return new JsonResponse(['valid' => true]);
    }
}
