<?php

namespace App\Controller;

use OpenApi\Annotations as OA;

class BlogController
{

    /**
     * @OA\Get(
     *     path="/posts",
     *     @OA\Response(
     *          response="200",
     *          description="Nos poissons",
     *          @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Post")),
     *     )
     * )
     */
    public function index () {
        
    }
}

