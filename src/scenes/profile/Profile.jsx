import React from 'react';

const Profile = () => {
    
  const profileData = {
    name: 'Eya Triki',
    bio: 'Human Ressources Manager',
  };

  const styles = {
    profileContainer: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    profileImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      marginRight: '20px',
    },
    profileDetails: {
      flexGrow: 1,
    },
    profileName: {
      fontSize: '1.5em',
      marginBottom: '10px',
    },
    profileBio: {
      fontSize: '1em',
      color: '#666',
    },
  };

  return (
    <div style={styles.profileContainer}>
      <img style={styles.profileImage} src={`../../assets/user.jpg`} alt={`${profileData.name}'s Profile`} />
      <div style={styles.profileDetails}>
        <h2 style={styles.profileName}>{profileData.name}</h2>
        <h5 style={styles.profileBio} >{profileData.bio}</h5>
      </div>
    </div>

  );
};

export default Profile;
