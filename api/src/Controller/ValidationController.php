<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ValidationController extends AbstractController
{
    private ValidatorInterface $validator;

    public function __construct(ValidatorInterface $validator) {
        $this->validator = $validator;
    }

    /**
     * @Route("/validate/email/{email}", methods={"GET"})
     *
     * @return JsonResponse
     */
    public function validate(string $email):JsonResponse
    {
        return new JsonResponse([
            'valid' => !$this->validator->validate($email, new Assert\Email())->count()
        ]);
    }
}
