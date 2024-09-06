const dogFriends = {
  luna: 'terrier/yorkshire',
  mango: 'germanshepherd',
  layla: 'mix'
}

export default async function getFriends(dogName) {
  try {
    const breed = dogFriends[dogName];
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    if (!response.ok) throw new Error(`Failed to get images of ${dogName}'s friends.`);
    const friends = await response.json();
    console.log(friends);
    return {
      photoUrl: friends.message
    };
  } catch (err) {
    console.warn(`getFriends() error! Message: ${err.message}`);
    return null;
  }
};