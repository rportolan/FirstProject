import Container from "../atoms/Container";
import Button from "../atoms/Button";
import ExpandableContainer from "../molecules/ExpandableContainer";
const Settings = () => {

    return (
      <>
      <h3>Settings</h3>
      <div className="flex gap-4 mt-8 justify-between">
        <Container className={"w-1/3 h-48"}>
          <h4 className="p-3">Conditions générales</h4>
          <div className="flex justify-center mt-10"><Button>Voir les conditions générales</Button></div>
        </Container>
        <Container className={"w-1/3 h-48"}>
          <h4 className="p-3">Mentions légales</h4>
          <div className="flex justify-center mt-10"><Button>Voir les mentions légales</Button></div>
        </Container>
        <Container className={"w-1/3 h-48"}>
          <h4 className="p-3">Cookies</h4>
          <div className="flex justify-center mt-10"><Button>Voir les cookies</Button></div>
        </Container>
      </div>
      <h3 className="mt-8">FAQ</h3>
      <ul>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        <li className="mt-6">
          <ExpandableContainer 
          title="Comment créer un objectif ?" 
          content="Pour créer un objectif, il faut tout d'abord réussir à bien définir celui-ci. De plus, il faudra avoir une compréhension parfaite de celui-ci. Ensuite rendez-vous sur la section 'créer un objectif'" 
          />
        </li>
        
      </ul>
      </>
    )
  }
  
  export default Settings;