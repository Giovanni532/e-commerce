import { fetchArticlesById } from '@/app/action/adminAction'
import { Image } from '@nextui-org/react'
import React from 'react'
import NextImage from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ButtonBuy from '@/components/buttonBuy'
import ButtonWallet from '@/components/buttonWallet'

interface ArticleDetailProps {
  params: {
    idArticle: string
  }
}

export default async function ArticleDetail({ params }: ArticleDetailProps) {
  const article = await fetchArticlesById(parseInt(params.idArticle))

  return (
    <div className="flex justify-center pt-20 w-h">
      <div className="flex">
        <div className="w-96 flex flex-col items-center justify-center p-6 rounded-lg">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              {article?.urlsImages.map(image => (
                <CarouselItem key={image}>
                  <Image
                    alt={article.nomProduit}
                    as={NextImage}
                    className="object-cover object-center rounded-xl h-80"
                    src={image}
                    quality={100}
                    height={500}
                    width={500}
                    priority
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-96 p-10">
          <h1 className="text-3xl font-bold">{article?.nomProduit}</h1>
          <p className="text-xl">Prix : {article?.prix} CHF</p>
          <p className="text-right">Ref: {article?.id}</p>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="border p-3 rounded">
              Taille : {article?.taille}
            </p>
            <p className="border p-3 rounded">
              Etat : {article?.etat}
            </p>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <span>Couleur :</span>
              <div className="mx-2 my-2 w-4 h-4 border rounded-full circle" style={{ backgroundColor: article?.couleur }}></div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <ButtonBuy />
            <ButtonWallet article={article} />
          </div>
        </div>
      </div>
    </div>
  )
}
