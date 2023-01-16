import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './styles.css';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useState } from 'react';

interface imageElement {
  src: string;
}

const Home: React.FC = () => {

  const [image, setImage] = useState<any>(null)
  const api = 'http://localhost/sete-entregas/api/images';

  const takePicture = async () => {
    console.log('Taking picture');
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    var imageElement: imageElement = { src: '' };
    setImage(image);
    // Can be set to the src of an image now
    imageElement.src = imageUrl!;
    uploadImage(imageUrl);
  };

  const base64FromPath = async function(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string');
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  const uploadImage = async (path: any) => {
    const base64Image = await base64FromPath(path!);
    console.log(base64Image);
    // post data to server
    const res = await fetch(`${api}/create.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        photo: base64Image,
        location: '123,123'
      })
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='btn-container'>
        <IonButton onClick={takePicture}>Take Picture</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
