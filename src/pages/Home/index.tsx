import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './styles.css';
import { Camera, CameraResultType } from '@capacitor/camera';

interface imageElement{
  src: string;
}

const Home: React.FC = () => {
  
  const takePicture = async () => {
    console.log('Taking picture');
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    var imageElement:imageElement = {src:'' };
    console.log('imageElement', imageElement);
    console.log('image', image);

    // Can be set to the src of an image now
    imageElement.src = imageUrl!;
  };


  return (
    <button onClick={takePicture}>Camera</button>
  );
};

export default Home;
