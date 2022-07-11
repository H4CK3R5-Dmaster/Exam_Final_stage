<?php

namespace App\Entity;

use App\Repository\UserRepository;
use App\Service\UserService;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    private $nom;

    #[ORM\Column(type: 'string', length: 40)]
    private $prenom;

    #[ORM\Column(type: 'string', length: 40)]
    private $email;

    #[ORM\Column(type: 'string', length: 40)]
    private $adresse;

    #[ORM\Column(type: 'string', length: 40)]
    private $tel;

    #[ORM\Column(type: 'datetime')]
    private $birthDate;

    #[ORM\ManyToOne(targetEntity: Possession::class)]
    private $possession;

    public $age;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): self
    {
        $this->tel = $tel;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(\DateTimeInterface $birthDate): self
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getPossession(): ?Possession
    {
        return $this->possession;
    }

    public function setPossession(?Possession $possession): self
    {
        $this->possession = $possession;

        return $this;
    }
    public function __toString()
    {
        return $this->getNom();
    }
    public function setAgeCalc(\DateTimeInterface $birthDate): self 
    {
        $us = new UserService;
        $this->age = $us->getAge($birthDate);
        return $this;
    }
}
