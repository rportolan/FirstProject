import { useState } from 'react';
import Container from "../atoms/Container";
import Button from "../atoms/Button";
import ExpandableContainer from "../molecules/ExpandableContainer";
import Modal from '../templates/Modal'; // Importer ton modal existant

const Settings = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);

  return (
    <>
      <h3>Settings</h3>
      <div className="md:flex gap-4 mt-8 justify-between">
        <Container className={"md:w-1/3 m-2 md:m-0 h-48"}>
          <h4 className="p-3">Conditions générales</h4>
          <div className="flex justify-center mt-10">
            <Button onClick={() => setShowTermsModal(true)}>Voir les conditions générales</Button>
          </div>
        </Container>
        <Container className={"md:w-1/3 m-2 md:m-0 h-48"}>
          <h4 className="p-3">Mentions légales</h4>
          <div className="flex justify-center mt-10">
            <Button onClick={() => setShowLegalModal(true)}>Voir les mentions légales</Button>
          </div>
        </Container>
        <Container className={"md:w-1/3 m-2 md:m-0 h-48"}>
          <h4 className="p-3">Cookies</h4>
          <div className="flex justify-center mt-10">
            <Button onClick={() => setShowCookiesModal(true)}>Voir les cookies</Button>
          </div>
        </Container>
      </div>

      {/* Modal pour les conditions générales */}
      <Modal show={showTermsModal} onClose={() => setShowTermsModal(false)}>
        <div className="p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Conditions Générales d'Utilisation</h3>
          <h4 className="text-lg font-semibold mt-6 mb-2">1. Introduction</h4>
          <p>
            Bienvenue sur One Goal, une plateforme de structuration d'objectifs. En utilisant notre site, vous acceptez de respecter les présentes Conditions Générales d'Utilisation (CGU).
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">2. Accès au site</h4>
          <p>
            L'accès à notre site est gratuit. Cependant, certaines fonctionnalités peuvent nécessiter la création d'un compte. Le site est destiné aux utilisateurs âgés de 18 ans et plus.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">3. Inscription et Compte</h4>
          <p>
            Pour utiliser certaines fonctionnalités, vous devez créer un compte en fournissant des informations exactes et complètes. Vous êtes responsable de la sécurité de vos identifiants de connexion et des activités effectuées sous votre compte.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">4. Utilisation du site et des services</h4>
          <p>
            Vous vous engagez à utiliser le site de manière légale et respectueuse. Il est interdit de publier du contenu illicite, offensant ou de spammer d'autres utilisateurs.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">5. Propriété intellectuelle</h4>
          <p>
            Tout le contenu du site (textes, images, logos) est la propriété de One Goal. Vous ne pouvez pas utiliser ce contenu sans notre autorisation préalable.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">6. Protection des données personnelles</h4>
          <p>
            Nous collectons et utilisons vos données personnelles conformément à notre Politique de Confidentialité.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">7. Responsabilité</h4>
          <p>
            One Goal ne garantit pas que le site sera exempt d'erreurs ou accessible en tout temps. Nous ne sommes pas responsables des dommages liés à l'utilisation du site.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">8. Modification des services et des CGU</h4>
          <p>
            Nous nous réservons le droit de modifier les services ou les CGU à tout moment. Les utilisateurs seront informés de toute modification significative.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">9. Résiliation</h4>
          <p>
            Nous nous réservons le droit de résilier votre compte en cas de violation des CGU.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">10. Loi applicable et juridiction</h4>
          <p>
            Les présentes CGU sont régies par la loi française. En cas de litige, les tribunaux français seront compétents.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">11. Contact</h4>
          <p>
            Pour toute question concernant ces CGU, vous pouvez nous contacter à <a href="mailto:support@onegoal.com" class="text-blue-500 underline">support@onegoal.com</a>.
          </p>
        </div>

        
      </Modal>

      {/* Modal pour les mentions légales */}
      <Modal show={showLegalModal} onClose={() => setShowLegalModal(false)}>
      <div>
        <h3 className="text-xl font-bold mb-4">Mentions légales</h3>

        <h4 className="text-lg font-semibold mt-6 mb-2">Éditeur du site</h4>
        <p>
          <strong>Nom de la société :</strong> One Goal Corporation <br />
          <strong>Adresse :</strong> 18 chemin des Barrières, 31170 CASTELGINEST <br />
          <strong>Téléphone :</strong> 0614797363 <br />
          <strong>Email :</strong> onegoal@acadamy.fr <br />
          <strong>Numéro de SIRET :</strong> BR-435-567-567 <br />
          <strong>Directeur de publication :</strong> Roméo Portolan
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Hébergement du site</h4>
        <p>
          <strong>Nom de l'hébergeur :</strong> One Goal Corporation <br />
          <strong>Adresse :</strong> 18 chemin des Barrières, 31170 CASTELGINEST <br />
          <strong>Téléphone :</strong> 0614797363
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Propriété intellectuelle</h4>
        <p>
          L'ensemble du contenu du site One Goal est protégé par les lois en vigueur
          sur la propriété intellectuelle. Tous les droits de reproduction sont réservés,
          y compris pour les documents téléchargeables et les représentations iconographiques
          et photographiques. Toute exploitation non autorisée du site ou de son contenu
          engage la responsabilité de l'utilisateur et peut entraîner des poursuites judiciaires.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Protection des données personnelles</h4>
        <p>
          Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée, et au Règlement
          Général sur la Protection des Données (RGPD) du 27 avril 2016, vous disposez d'un droit d'accès,
          de rectification, de suppression, de limitation, d'opposition et de portabilité des données
          vous concernant. Pour exercer ces droits, vous pouvez nous contacter à l'adresse email suivante :
          onegoal@acadamy.fr.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Cookies</h4>
        <p>
          Le site One Goal peut être amené à utiliser des cookies afin d'améliorer l'expérience de
          navigation et à des fins statistiques. Vous pouvez désactiver les cookies en modifiant les
          paramètres de votre navigateur.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Responsabilité</h4>
        <p>
          L'éditeur du site décline toute responsabilité pour tout dommage résultant de l'accès ou de
          l'utilisation du site, y compris toute détérioration ou virus qui pourrait infecter votre
          équipement informatique ou tout autre bien.
        </p>
      </div>
      </Modal>

      {/* Modal pour les cookies */}
      <Modal show={showCookiesModal} onClose={() => setShowCookiesModal(false)}>
        <h2 className="text-xl font-bold mb-4">Cookies</h2>
        <div>
          <h4 className="text-lg font-semibold mt-6 mb-2">Politique des Cookies</h4>

          <h4 className="text-lg font-semibold mt-6 mb-2">Utilisation des cookies</h4>
          <p>
            Le site One Goal utilise des cookies pour améliorer votre expérience de navigation et 
            analyser l'utilisation du site. Les cookies sont des petits fichiers texte stockés sur 
            votre appareil lorsque vous visitez notre site. Ils nous aident à comprendre vos préférences 
            et à adapter notre site en conséquence.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">Types de cookies utilisés</h4>
          <p>
            <strong>Cookies strictement nécessaires :</strong> Ces cookies sont essentiels pour vous permettre 
            de naviguer sur le site et d'utiliser ses fonctionnalités, comme l'accès à des zones sécurisées du site.
          </p>
          <p>
            <strong>Cookies de performance :</strong> Ces cookies collectent des informations sur la façon dont 
            les visiteurs utilisent le site, comme les pages les plus visitées. Ils ne collectent pas d'informations 
            qui identifient un visiteur. Toutes les informations collectées par ces cookies sont agrégées et donc anonymes.
          </p>
          <p>
            <strong>Cookies de fonctionnalité :</strong> Ces cookies permettent au site de se souvenir des choix 
            que vous faites (comme votre nom d'utilisateur, la langue ou la région dans laquelle vous vous trouvez) 
            et de fournir des fonctionnalités améliorées et personnalisées.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">Gestion des cookies</h4>
          <p>
            Vous pouvez contrôler et gérer les cookies en utilisant les paramètres de votre navigateur. 
            La plupart des navigateurs vous permettent de consulter, de supprimer ou de bloquer les cookies 
            d'un site web. Toutefois, la désactivation des cookies peut affecter votre expérience de navigation 
            sur notre site et certaines fonctionnalités peuvent ne plus être disponibles.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">Durée de conservation des cookies</h4>
          <p>
            Les cookies ont une durée de vie limitée. Ils sont stockés sur votre appareil pour une durée déterminée 
            ou jusqu'à ce que vous les supprimiez manuellement. La durée de conservation des cookies varie en fonction 
            du type de cookie utilisé.
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-2">Modifications de la politique des cookies</h4>
          <p>
            Nous nous réservons le droit de modifier cette politique des cookies à tout moment. Toute modification 
            sera affichée sur cette page, et nous vous encourageons à la consulter régulièrement pour rester informé 
            sur la façon dont nous utilisons les cookies.
          </p>
        </div>

      </Modal>

      <h3 className="mt-8">FAQ</h3>
      <ul>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        {/* Ajoutez les autres questions de la FAQ ici */}
      </ul>
    </>
  );
};

export default Settings;
