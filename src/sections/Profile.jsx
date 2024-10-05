import ProfileMenu from "../Components/ProfileMenu"
import UserProfile from "../Components/UserProfile"
import Menu from "./Menu"
const Profile = () => {
  return (
    <section id="Profile" className="bg-gradient-to-r from-[#ede8dd] via-[#d0c9bd] to-[#d7d3cb] flex flex-col   h-[90vh] pb-6">
        <UserProfile/>
        <ProfileMenu/>
    <Menu/>
    </section>
  )
}

export default Profile
