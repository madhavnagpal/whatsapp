function getReceipientEmail(users, userLoggedIn) {
  return users?.filter(
    (userToFilter) => userToFilter !== userLoggedIn?.email
  )[0];
}

export default getReceipientEmail;
