import Container from "../atoms/Container";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import profilePicture from '../../assets/profile_picture.svg';


const Profile = () => {

    return (
    <>
        <div className="flex justify-between">
        <h3>Mon profil</h3>
        <Button className={"bg-red-400"}>Se déconnecter</Button>
        </div>
        <div className="min-h-screen mt-4 grid grid-cols-8 grid-rows-6 gap-4">
            <Container className="col-span-5 row-span-2">
                <h4 className="p-3">Profile Picture</h4>
                <div className="flex items-center justify-between mx-14 mt-8">
                    <Icon iconPath={profilePicture} width={'w-20'} height={'h-20'}/>
                    <div className="flex gap-4">
                    <Button>Changer la photo</Button>
                    <Button className={"bg-red-400"}>Supprimer</Button>
                    </div>
                </div>
                
            </Container>
            <Container className="col-span-3 row-span-3">
                <h4 className="p-3">Modifier votre mot de passe</h4>
                <div className="mt-10">
                    <div className="w-4/5 mx-auto">
                        <Input
                        type="password"
                        className="w-full p-1 text-sm"
                        text="Mot de passe"
                        />
                    </div>
                    <div className="w-4/5 mx-auto mt-4">
                        <Input
                        type="password"
                        className="w-full p-1 text-sm"
                        text="Confirmer votre mot de passe"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-10"><Button>Enregistrer</Button></div>
                
            </Container>
            <Container  className="col-span-5 row-span-3">
                <h4 className="p-3">Informations personnelles</h4>
                <div className="w-full mt-10">
                    <div className="w-11/12 flex flex-wrap mx-auto gap-2">
                        <div className="w-72 mx-auto">
                        <Input
                            text="Nom"
                            type="text"
                            className="w-full text-sm p-1"
                        />
                        </div>
                        <div  className="w-72 mx-auto">
                        <Input
                            text="Prénom"
                            type="text"
                            className="w-full text-sm p-1"
                        />
                        </div>   
                        <div className="w-72 ml-3 mt-4">
                        <Input
                            text="Email"
                            type="email"
                            className="w-full text-sm p-1"
                        />
                        </div> 
                    </div>
                    <div className="flex justify-center mt-10"><Button>Enregistrer</Button></div>
                </div>
                
            </Container>
            <Container  className="col-span-3 row-span-2">
                <h4 className="p-3">Supression du compte</h4>
                <p className="mx-auto px-9 text-center text-xs mt-5">Attention, la suppresion de votre compte entrainera la suppresion de vos objectifs, êtes-vous bien sûr de votre choix ?</p>
                <div className="flex justify-center mt-4"><Button className={"bg-red-400"}>Supprimer le compte</Button></div>
            </Container>
        </div>
    </>
    )
  }
  
  export default Profile;