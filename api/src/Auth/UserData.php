<?php
declare(strict_types=1);

namespace App\Auth;

use Symfony\Component\Validator\Constraints as Assert;

class UserData {
    /**
     * @Assert\Email()
     */
    private string $email;

    /**
     * @Assert\NotNull()
     * @Assert\Length(min="3")
     */
    private string $password;

    public function __construct(string $email, string $password)
    {
        $this->email = $email;
        $this->password = $password;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}
