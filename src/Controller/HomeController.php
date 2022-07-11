<?php

namespace App\Controller;

use App\Entity\Possession;
use App\Entity\User;
use Normalizer;
use App\Repository\UserRepository;
use App\Repository\PossessionRepository;
use DateTime;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Service\UserService;
use Symfony\Component\Messenger\Transport\Serialization\Serializer;

class HomeController extends AbstractController
{
    //HOME 

    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/api/users', name: 'users_api', methods: "GET")]
    public function getUsers(UserRepository $user, SerializerInterface $ser)
    {
        $Users = $user->findAll();
        foreach ($Users as $UserAge => $value) {
            $eachUser = $value->setAgeCalc($value->getBirthDate());
            
        };
        $json = $ser->serialize($Users, 'json');
        $resp = new JsonResponse($json, 200, [], true);
        return $resp;
    }
    
    #[Route('/api/user/{id}', name: 'userbyid_api', methods: "DELETE")]
    public function delUserById(Request $rq,UserRepository $user, SerializerInterface $ser, EntityManagerInterface $manager,  $id)
    {
        $User = $user->find([
            'id' => $id
        ]);
        
        $json = $ser->serialize($User, 'json');
        $resp = new JsonResponse($json, 200, [], true);
        
        $manager->remove($User);
        
        $manager->flush();
        return $resp;
        
    }
    
    


    #[Route('/api/users', name: "new_user", methods: "POST")]
    public function createUser(Request $rq, EntityManagerInterface $manager)
    {
        $new = new User;
        $new->setNom($rq->request->get('nom'));
        $new->setPrenom($rq->request->get('prenom'));
        $new->setEmail($rq->request->get('email'));
        $new->setTel($rq->request->get('tel'));
        $new->setAdresse($rq->request->get('adresse'));
        
        $stringDate = $rq->request->get('birth');
        $date =new \DateTime($stringDate);
        $former = $date->format('Y-m-d');
        $new->setBirthDate(new \DateTime($former));




        $manager->persist($new);
        $manager->flush();
        return $this->redirect($rq->getUri());
    }





    //DETAIL USER



    #[Route('/api/possessions', name: 'possession_api', methods: "GET")]
    public function getPossessions(PossessionRepository $pos, NormalizerInterface $normalizer)
    {
        $Possession = $pos->findAll();

        $posNormalise = $normalizer->normalize($Possession);
        $json = json_encode($posNormalise);

        $resp = new Response($json, 200, [
            "Content-Type" => "application/json"
        ]);
        return $resp;
    }

    #[Route('/api/user/spec/{id}', name: 'user_spec', methods: "GET")]
    public function getUserInfo(SerializerInterface $ser, UserRepository $user,$id)
    {
        $User = $user->findBy([
            'id' => $id
        ]);
        foreach ($User as $UserAge => $value) {
            $eachUser = $value->setAgeCalc($value->getBirthDate());
        };
        
        $json = $ser->serialize($User, 'json');
        $resp = new JsonResponse($json, 200, [], true);
        return $resp;
    }
    #[Route('/api/user/spec/${id}', name: "new_possession", methods: "POST")]
    public function addPossess(Request $rq, EntityManagerInterface $manager, $id)
    {
        $new = new Possession;
        $new->setNom($rq->request->get('nom'));
        $new->setValeur($rq->request->get('val'));
        $new->setType($rq->request->get('type'));
        
        




        $manager->persist($new);
        $manager->flush();
        return $this->redirect($rq->getUri());
    }

    
   
}
