import Button from '@/components/Button';
import Profile from 'assets/img/self-profile.jpg';
import { Container } from './styles';

export default function SideBarAbout() {
  return (
    <Container>
      <h4>Creator in the box</h4>
      <img src={Profile} alt="Yusril Muttaqien" />
      <h5>Yusril Muttaqien</h5>
      <p>
        Hi! Yusril here, it's been a blast making this site. Solely working from a single frame was
        a good challenge for me in trying to make something out of it. Here I try to showcase my
        ability to slice dashboard-esque design, and behind the UIs I'm utilizing extensively
        Session and LocalStorage for data storage.
      </p>
      <p>
        I'll consider this project as those developers' first to-do list application, but here I mix
        it with extra features such as chats between tabs (yes, tabs because of the use of
        LocalStorage), activity history, and drag-n-drop features.
      </p>
      <Button className="custom-button" href="https://www.linkedin.com/in/ydhm/" target="_blank">
        LinkedIn
      </Button>
      <Button href="https://github.com/yusrmuttaqien/dashboard-site" target="_blank">
        Project Github
      </Button>
    </Container>
  );
}
