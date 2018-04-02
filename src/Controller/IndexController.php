<?php

namespace App\Controller;

use App\Entity\Block;
use http\Env\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        $em = $this->getDoctrine()->getManager();
        $blocks = $em->getRepository(Block::class)->findAll();

        return $this->render('base.html.twig',[
            'blocks'  => $blocks,
        ]);
    }

    /**
     * @Route("/generate.{_format}", defaults={"_format"="css"}, name="css")
     */
    public function css()
    {
        $em = $this->getDoctrine()->getManager();
        $blocks = $em->getRepository(Block::class)->findAll();

        return $this->render('css/base.css.twig',[
            'blocks'  => $blocks,
        ]);
    }
}
