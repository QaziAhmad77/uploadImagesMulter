import axios from 'axios';
import { useEffect, useState } from 'react';
import { TbCameraUp } from 'react-icons/tb';

function App() {
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [allImages, setAllImages] = useState(null);
  console.log(image);
  console.log(showImage, 'show Image');
  const submitImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      const result = await axios.post(
        'http://localhost:5000/api/images/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setRefresh(true);
    } catch (err) {
      console.log(err);
    }
  };
  const onInputChange = (e) => {
    const selectedImage = e.target.files[0];
    setShowImage(URL.createObjectURL(selectedImage));
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const getImages = async () => {
    try {
      const result = await axios.get(
        'http://localhost:5000/api/images/get-all-images'
      );
      console.log(result?.data?.images, 'hiiiiiiiii');
      setAllImages(result?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getImages();
  }, [refresh]);
  return (
    <div
      style={{
        backgroundColor: 'royalblue',
        width: '100vw',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          width: '500px',
          height: '150px',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          marginTop: '50px',
        }}
      >
        <form
          onSubmit={submitImage}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <p
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              marginBottom: '6px',
            }}
          >
            Let's Upload
          </p>
          <input
            type="file"
            accept="image/*"
            name=""
            id="file"
            onChange={onInputChange}
            style={{ display: 'none' }}
          />
          <label
            htmlFor="file"
            style={{
              width: '60px',
              height: '60px',
              position: 'relative', // Add relative positioning to the label
              border: 'dashed 1px red',
            }}
          >
            <span
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                position: 'relative', // Add relative positioning to the span
              }}
            >
              {showImage === null ? (
                <TbCameraUp
                  style={{
                    width: '70%',
                    height: '70%',
                    position: 'absolute', // Set absolute positioning
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Center both axes
                  }}
                />
              ) : (
                <div style={{ width: '90%', height: '90%' }}>
                  <img
                    style={{ width: '100%', height: '93%' }}
                    src={showImage}
                  />
                </div>
              )}
            </span>
          </label>

          <button
            type="submit"
            style={{
              backgroundColor: 'royalblue',
              border: 'none',
              fontSize: '20px',
              color: 'white',
              borderRadius: '4px',
              padding: '6px',
              alignSelf: 'start',
              marginTop: '20px',
              cursor: 'pointer',
            }}
          >
            Upload Image
          </button>
        </form>
        {image === '' || image === null ? (
          ''
        ) : (
          <img
            style={{ width: '50%', height: '100%' }}
            width={100}
            height={100}
            src={showImage}
            alt=""
          />
        )}
      </div>
      <div
        style={{
          width: '700px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        {allImages === null
          ? ''
          : allImages.images.map((data) => {
              console.log(`./images/${data.image}`);
              return (
                <>
                  <div key={Math.random()} style={{}}>
                    <img
                      key={Math.random()}
                      style={{ objectFit: 'fill' }}
                      width={220}
                      height={200}
                      src={`/images/${data.image}`}
                    />
                  </div>
                </>
              );
            })}
      </div>
    </div>
  );
}

export default App;
