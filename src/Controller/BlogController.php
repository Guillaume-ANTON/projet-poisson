<?php

namespace App\Controller;

use OpenApi\Annotations as OA;

class BlogController
{

    /**
     * @OA\Get(
     *     path="/peche/name",
     *     @OA\Response(
     *          response="200",
     *          description="Carnet de pêche",
     *          @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Post")),
     *     )
     * )
     */
    public function index () {
        
    }

    /**
     * @OA\Post(
     *     path="/peche/name/add",
     *     @OA\Parameter(
     *      name="nom",
     *      in="path",
     *      description="Ajout d'un nouveau poisson",
     *      required=true,
     *      @OA\Schema(type="integer")
     *      ),
     *     @OA\Response(
     *          response="200",
     *          description="Le poisson",
     *          @OA\JsonContent(ref="#/components/schemas/Post"),
     *     )
     * )
     */
    public function show () {
        
    }


    /**
     * @OA\Put(
     *     path="/peche/name/update",
     *     @OA\Parameter(
     *      name="ajout",
     *      in="path",
     *      description="Mise à jour des informations de votre poisson",
     *      required=true,
     *      @OA\Schema(type="integer")
     *      ),
     *     @OA\Response(
     *          response="200",
     *          description="Le poisson",
     *          @OA\JsonContent(ref="#/components/schemas/Post"),
     *     )
     * )
     */
    public function show2 () {
        
    }


    /**
     * @OA\Delete(
     *     path="/peche/name/delete",
     *     @OA\Parameter(
     *      name="supression",
     *      in="path",
     *      description="Supression d'un poisson",
     *      required=true,
     *      @OA\Schema(type="integer")
     *      ),
     *     @OA\Response(
     *          response="200",
     *          description="Le poisson",
     *          @OA\JsonContent(ref="#/components/schemas/Post"),
     *     )
     * )
     */
    public function show3 () {
        
    }
}

