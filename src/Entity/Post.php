<?php

namespace App\Entity;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema()
 */
class Post
{

    /**
     * @OA\Property(type="integer")
     * @var int
     */

    public $id;

    /**
     * @OA\Property(type="string", nullable=true)
     * @var string|null
     */
    public $nom;

    /**
     * @OA\Property(type="string", nullable=true)
     * @var string|null
     */
    public $espece;

    /**
     * @OA\Property(type="integer", nullable=true)
     * @var int
     */
    public $taille;

    /**
     * @OA\Property(type="integer", nullable=true)
     * @var int
     */
    public $poids;

    /**
     * @OA\Property(type="string", nullable=true)
     * @var string|null
     */
    public $lieu;

    /**
     * @OA\Property(type="string", format="date-time" nullable=true)
     * @var \DateTimeInterface|null
     */
    public $date;


}







