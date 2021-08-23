import {Logo} from '@coderscamp/ui/components/Logo';

export const Footer = () => {
  return (
    <section className="footer">
      <section className="footer__about aboutCodersCrew">
        <div className=" aboutCodersCrew__container">
          <Logo color="black" className="aboutCodersCrew__logo"/>
          <div className="aboutCodersCrew__information">
            Organizatorem CodersCamp jest Stowarzyszenie CodersCrew - organizacja non-profit zrzeszająca pasjonatów
            dziedzin związanych z IT.
          </div>
          <div className="aboutCodersCrew__information">icon_1 icon_2</div>
        </div>
      </section>

      <section className="footer__nav footerNav">
        <div className=" footerNav__container">
          <div className="footerNav__nav">
            <header className="footerNav__title"> title</header>
            <span className="footerNav__item"> item </span>
            <span className="footerNav__item"> item </span>
            <span className="footerNav__item"> item </span>
          </div>
          <div className="footerNav__toDownload">
            <header className="footerNav__title"> title</header>
            <span className="footerNav__item"> item </span>
            <span className="footerNav__item"> item </span>
            <span className="footerNav__item"> item </span>
          </div>
          <div className="footerNav__legalIssues">
            <header className="footerNav__title"> title</header>
            <span className="footerNav__item"> item </span>
            <span className="footerNav__item"> item </span>
            <span className="footerNav__item"> item </span>
          </div>
        </div>
      </section>

      <section className="footer__bottomSection">
        <div className=" footerBottomSection__container">
          <p className="footerBottomSection__copyright">© CodersCamp 2021, wszelkie prawa zastrzeżone.</p>
          <div className="footerBottomSection__vercelLogo" />
        </div>
      </section>
    </section>
  );
};
