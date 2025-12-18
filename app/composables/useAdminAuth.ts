export const useAdminAuth = () => {
  const isLoggedIn = useState<boolean>("admin-logged-in", () => false)
  return { isLoggedIn }
}