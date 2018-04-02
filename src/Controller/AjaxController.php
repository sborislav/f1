<?php

namespace App\Controller;

use App\Entity\Message;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AjaxController extends Controller
{
    /**
     * @Route("/ajax", name="ajax")
     */
    public function index(Request $request)
    {
        $method = $request->query->get('method');

        if ( $method && method_exists($this, $method.'Method') ) {
            $method = $method.'Method';
            return $this->$method($request);
        }
        return $this->json([
            'status' => false,
            'error' => 'Метод не найден',
        ]);
    }

    private function callbackMethod($request, \Swift_Mailer $mailer)
    {
        $name = $request->query->get('name');
        $phone = $request->query->get('phone');

        if ( $name && $phone  ) {
            if ( preg_match('/\+7\(\d{3}\) \d{3}-\d{4}/', $phone) ) {
                $message = new Message();
                $message->setName($name)->setPhone($phone)->setDateTime(new \DateTime());
                try {
                    $em = $this->getDoctrine()->getManager();
                    $em->persist($message);
                    $em->flush();

                    /*
                    $message = (new \Swift_Message('Новая заявка'))
                        ->setFrom('send@example.com')
                        ->setTo('info@dot-tech.ru')
                        ->setBody(
                            $this->renderView(
                            // templates/emails/registration.html.twig
                                'emails/send.html.twig',
                                array('name' => $name, 'phone' => $phone)
                            ),
                            'text/html'
                        )
                    ;
                    $mailer->send($message);
                    */

                    return $this->json([
                        'status' => true,
                        'message' => 'Заявка успешно создана',
                    ]);
                } catch ( \Exception $exception) {
                    return $this->json([
                        'status' => false,
                        'error' => 'Ошибка при создании заявки',
                    ]);
                }
            }
        }
        return $this->json([
            'status' => false,
            'error' => 'Ошибка при вводе данных',
        ]);
    }

}
