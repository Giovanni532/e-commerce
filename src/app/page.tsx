import CarouselHome from "@/components/carouselHome";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {

  return (
    <main className="flex-1">
      <section className="bg-backgroundRevive py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4 text-primary">Mode Revive</h1>
            <p className="text-gray-600 mb-8">Découvrez nos articles les plus appréciés de la saison.</p>
            <div className="flex space-x-4 mx-auto md:m-0">
              <Button color="primary">Voir les produits</Button>
            </div>
          </div>
          <div>
            <CarouselHome />
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Catégories de produits</h2>
          <div className="grid grid-cols-4 gap-8">
            <Link
              href="#"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              prefetch={false}
            >
              <img src="/placeholder.svg" width={300} height={200} alt="Vêtements" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Vêtements</h3>
                <p className="text-gray-600">Découvrez notre collection de vêtements tendance.</p>
              </div>
            </Link>
            <Link
              href="#"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              prefetch={false}
            >
              <img src="/placeholder.svg" width={300} height={200} alt="Accessoires" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Accessoires</h3>
                <p className="text-gray-600">Complétez votre look avec nos accessoires de mode.</p>
              </div>
            </Link>
            <Link
              href="#"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              prefetch={false}
            >
              <img src="/placeholder.svg" width={300} height={200} alt="Chaussures" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Chaussures</h3>
                <p className="text-gray-600">Découvrez notre collection de chaussures tendance.</p>
              </div>
            </Link>
            <Link
              href="#"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              prefetch={false}
            >
              <img src="/placeholder.svg" width={300} height={200} alt="Beauté" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Beauté</h3>
                <p className="text-gray-600">Prenez soin de vous avec nos produits de beauté.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Promotions et nouveautés</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/placeholder.svg" width={400} height={300} alt="Promotion" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Promotion du mois</h3>
                <p className="text-gray-600 mb-4">Profitez de nos meilleures offres du moment.</p>
                <Button>Découvrir</Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/placeholder.svg" width={400} height={300} alt="Nouveauté" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Nouvelles arrivages</h3>
                <p className="text-gray-600 mb-4">Découvrez nos dernières tendances mode.</p>
                <Button>Voir les nouveautés</Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/placeholder.svg" width={400} height={300} alt="Offre spéciale" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Offre spéciale</h3>
                <p className="text-gray-600 mb-4">Ne manquez pas nos meilleures offres.</p>
                <Button>Découvrir</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
