export const submitOnboarding = async (formData, user, router, dispatch) => {
  if (!user?.uid) {
    console.error('User not found!');
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);

    const updatedUser = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      role: formData.role, // ✅ write role here
      ...formData,
      isOnboarded: true,
      isAuthenticated: true,
      createdAt: new Date().toISOString(),
    };

    await setDoc(userRef, updatedUser, { merge: true });
    dispatch(setUser(updatedUser));
    router.push(`/dashboard/${formData.role}`);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};
