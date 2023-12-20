import Profile from 'assets/img/Profile.jpg';
import { Container, Link } from './styles';

export default function SideBarAbout() {
  return (
    <Container>
      <h4>Creator in the box</h4>
      <img src={Profile} alt="Yusril Muttaqien" />
      <h5>Yusril Muttaqien</h5>
      <p>
        Hi! Yusril here, it's been a blast making this site. Solely working from singular static
        design was a good challenge for me in trying to make something nice. I do encounter multiple
        problems here and there. With Safari being Safari, Chromium battling against Firefox, etc.
      </p>
      <p>
        I hope whoever you are reviewing this site is hyped as I'm in the making. It isn't perfect,
        there is a flaw here and there. But I decided to pat myself on the back for doing all of the
        planning and execution in three days. It definitely could be better, but this was a good
        run. Thank you for the challenge, and I hope we can meet soon following the application 👋.
      </p>
      <Link href="https://www.linkedin.com/in/ydhm/" target="_blank">
        LinkedIn
      </Link>
      <Link href="https://github.com/yusrmuttaqien/dashboard-site" target="_blank">
        Project Github
      </Link>
    </Container>
  );
}
