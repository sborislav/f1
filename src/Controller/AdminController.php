<?php

namespace App\Controller;

use App\Entity\Block;
use App\Entity\Message;
use App\Form\BlockType;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AdminController extends Controller
{

    /**
     * @Route("/admin", name="admin")
     */
    public function admin()
    {
        $calls = $this->getDoctrine()->getRepository(Message::class)->findBy([],['id' => 'DESC']);

        return $this->render('admin/callback.html.twig', array(
            'calls'         => $calls,
        ));
    }

    /**
     * @Route("/admin/site", name="edit")
     */
    public function edit(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $block = new Block();
        $form = $this->createForm(BlockType::class, $block);
        $form->handleRequest($request);

        if ( $form->isSubmitted() && $form->isValid() ) {
            $em->persist($block);
            $em->flush();
        }

        if ( $request->request->has('delete') ) {
            $id = $request->request->get('id');
            $block = $em->getRepository(Block::class)->find($id);
            if ( $block ){
                $em->remove($block);
                $em->flush();
            }
        }


        $blocks = $em->getRepository(Block::class)->findAll();


        return $this->render('admin/blocks.html.twig', array(
            'form'    => $form->createView(),
            'blocks'  => $blocks,
        ));
    }

    /**
     * @Route("/login", name="login")
     */
    public function index(Request $request, AuthenticationUtils $authenticationUtils)
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('admin/index.html.twig', array(
            'last_username' => $lastUsername,
            'error'         => $error,
        ));
    }



}
