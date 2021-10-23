import { ReactNode } from 'react';

import {
  CANDIDATE_SCHEDULE_PATH,
  COURSE_PLAN_URL,
  MAIN_TEST_HOUR,
  MODULES_COUNT,
  PARTICIPANT_RECRUITMENT_FORM_URL,
  PLACES_COUNT,
  SCHEDULE_URL,
  TEAM_SIZE,
} from '@/constants';

import { ExternalLink } from '../ExternalLink';
import { InternalLink } from '../InternalLink';

export interface Question {
  title: string;
  content: ReactNode;
}

const fullHarmonogram = <ExternalLink href={SCHEDULE_URL}>pełnym harmonogramie CodersCamp</ExternalLink>;

export const useQuestions = (): Question[] => {
  return [
    {
      title: 'W jakich dniach i godzinach odbywają się spotkania?',
      content: (
        <>
          Kurs łączy w sobie pracę indywidualną (przerabianie materiałów) oraz pracę zespołową (tworzenie projektów).
          Czas przerabiania materiałów możesz w pełni dostosować do swoich potrzeb. W przypadku pracy projektowej
          wszystko zależy od ustaleń, jakie wypracujesz wspólnie ze swoim zespołem — ze swojej strony nie narzucamy
          odgórnie formy, czasu, ani częstotliwości spotkań zespołowych. Spotkania organizacyjne oraz testy organizowane
          są zawsze o godzinie {MAIN_TEST_HOUR}, a ich dokładne rozmieszczenie możesz zobaczyć w {fullHarmonogram}.
        </>
      ),
    },
    {
      title: 'Czy w kursie mogą brać udział cudzoziemcy?',
      content: 'Tak, narodowość nie ma żadnego wpływu na możliwość wzięcia udziału w kursie.',
    },
    {
      title: 'W jakim języku realizowany jest kurs?',
      content: (
        <>
          Cała komunikacja na kursie, interaktywny plan nauki oraz testy są w języku polskim. Konkretne materiały
          podlinkowane w ramach planu nauki prowadzą zarówno do polskich, jak i angielskich źródeł. Wszystkie projekty
          oraz zadania praktyczne napisane są w języku angielskim
        </>
      ),
    },
    {
      title: 'Jak zapisać się na kurs?',
      content: (
        <>
          <ExternalLink href={PARTICIPANT_RECRUITMENT_FORM_URL}>Kliknij tutaj</ExternalLink> i wypełnij formularz
          rekrutacyjny. Po zapisaniu się sprawdź pełen harmonogram zapisów na CodersCamp dostępny{' '}
          <InternalLink href={CANDIDATE_SCHEDULE_PATH}>w tej sekcji</InternalLink>.
        </>
      ),
    },
    // {
    //   title: 'Jak zapisać się na kurs?',
    //   content: (
    //     <>
    //       Pełny harmonogram zapisów na CodersCamp znajdziesz{' '}
    //       <InternalLink href={CANDIDATE_SCHEDULE_PATH}>w tej sekcji</InternalLink>. Możesz także{' '}
    //       <ExternalLink onClick={() => openModal('participant')}>kliknąć tutaj</ExternalLink> i podać nam swój adres
    //       e-mail a przypomnimy Ci o rozpoczęciu rekrutacji.
    //     </>
    //   ),
    // },
    {
      title: 'Ile osób dostaje się na kurs?',
      content: (
        <>
          Ze względu na {TEAM_SIZE}-osobową liczebność zespołów liczba miejsc na kursie to: {TEAM_SIZE} * liczba
          mentorów. Aktualnie możemy przyjąć na kurs {PLACES_COUNT} osób. Pamiętaj jednak, że do rozpoczęcia CodersCamp
          ta wartość będzie jeszcze rosnąć.
        </>
      ),
    },
    {
      title: 'Co jeśli dostanę się na kurs?',
      content: (
        <>
          Zostaniesz przydzielony do {TEAM_SIZE}-osobowego zespołu, gdzie ze wsparciem mentora będziesz nadal się
          rozwijał i tworzył projekty. Od tego momentu czekają Cię jeszcze {MODULES_COUNT - 1} moduły i związane z nimi
          testy, po których przejściu będziesz gotowy do rozpoczęcia kariery jako web developer.
        </>
      ),
    },
    {
      title: 'Co jeśli nie dostanę się na kurs?',
      content: (
        <>
          Otrzymasz od nas pełną wersję interaktywnego planu nauki, który przeprowadzi Cię przez teorię dotyczącą web
          developmentu. Nie zostaniesz jednak przydzielony do zespołu projektowego, przez co kwestia budowania portfolio
          będzie leżała całkowicie po Twojej stronie. Jako dodatkowe wsparcie otrzymasz dostęp do zamkniętego serwera
          Discord, na którym znajdują się wszystkie osoby zapisane na CodersCamp — możesz wykorzystać to do
          zorganizowania zespołu projektowego na własną rękę.
        </>
      ),
    },
    {
      title: 'Gdzie znajdę formularz rekrutacyjny?',
      content: (
        <>
          Formularz rekrutacyjny dostępny jest{' '}
          <ExternalLink href={PARTICIPANT_RECRUITMENT_FORM_URL}>pod tym linkiem</ExternalLink>.
        </>
      ),
    },
    // {
    //   title: 'Gdzie znajdę formularz rekrutacyjny?',
    //   content: (
    //     <>
    //       Link do formularza znajdziesz na stronie głównej, kiedy tylko rozpocznie się rejestracja na kurs (
    //       <InternalLink href={CANDIDATE_SCHEDULE_PATH}>szczegóły tutaj</InternalLink>
    //       ). Możesz także otrzymać link do formularza na swoją skrzynkę e-mail w pierwszym dniu rekrutacji. W tym celu{' '}
    //       <ExternalLink onClick={() => openModal('participant')}>kliknij tutaj</ExternalLink> i zostaw nam swój mail.
    //     </>
    //   ),
    // },
    {
      title: 'Jaki jest minimalny wiek uczestników?',
      content: (
        <>
          Na CodersCamp mogą zapisać się osoby w każdym wieku. Jeśli masz mniej niż 16 lat, będziemy jedynie wymagać
          odpowiedniej zgody podpisanej przez Twojego opiekuna prawnego (odezwiemy się do Ciebie w tej sprawie, kiedy
          dostaniesz się na kurs).
        </>
      ),
    },
    {
      title: 'Czy muszę posiadać już jakąś wiedzę/doświadczenie?',
      content: 'Nie. Kurs prowadzony jest całkowicie od podstaw.',
    },
    {
      title: 'Jakich technologii uczycie na kursie?',
      content: (
        <>
          Informację o wszystkich technologiach możesz odnaleźć w naszym{' '}
          <ExternalLink href={COURSE_PLAN_URL}>planie kursu</ExternalLink>.
        </>
      ),
    },
    {
      title: 'Nie dam rady pojawić się na teście kwalifikacyjnym. Co mogę zrobić?',
      content: (
        <>
          Niestety test kwalifikacyjny na CodersCamp odbywa się tylko raz w ściśle określonym terminie 😕 Jeśli nie uda
          Ci się na nim pojawić, nie będziesz miał szansy, aby dostać się na kurs.
        </>
      ),
    },
    {
      title: 'Chciałbym zostać mentorem, ale boję się, że mam pewne braki w wiedzy. Czy nadal mam szansę?',
      content: (
        <>
          Bardzo możliwe. Jeżeli działasz już jako web developer i patrząc na nasz plan kursu, widzisz u siebie braki
          wiedzy tylko w kilku miejscach (np. pracujesz na co dzień w Vue zamiast React&apos;a lub jesteś front-end
          developerem i nie znasz dobrze Node.js) będziesz miał ponad 2 miesiące na uzupełnienie braków. Oczywiście w
          tym czasie możesz liczyć na pełną pomoc ze strony nas oraz innych mentorów.
        </>
      ),
    },
    {
      title: 'Czy jako mentor mogę prowadzić swój zespół wspólnie z innym mentorem?',
      content: (
        <>
          Bez problemu. Jeśli nie czujesz, że Twoje predyspozycje czasowe wystarczają, aby prowadzić zespół
          samodzielnie, daj nam znać. Przypiszemy Cię do zespołu razem z innym mentorem o podobnej preferencji. Jeśli
          masz już na myśli kogoś konkretnego, z kim chciałbyś prowadzić zespół, również daj nam znać.
        </>
      ),
    },
    {
      title: 'Czy da się pogodzić uczestnictwo w kursie z innymi obowiązkami jak studia czy praca?',
      content: (
        <>
          CodersCamp jest bardzo elastycznym kursem. Materiały teoretyczne możesz przerabiać w dowolnym momencie, a
          spotkania dotyczące projektów ustalasz indywidualnie w ramach swojego {TEAM_SIZE}-osobowego zespołu. Jedyne
          terminy, które są obowiązkowe i nieprzesuwalne to terminy testów. Testy zawsze odbywają się raz w miesiącu, w
          środę o {MAIN_TEST_HOUR}. Ich dokładny rozkład możesz sprawdzić w {fullHarmonogram}.
        </>
      ),
    },
    {
      title: 'Ile czasu tygodniowo należy zarezerwować na uczestnictwo w kursie?',
      content: (
        <>
          Aby nadążać za programem kursu, warto poświęcać na niego co najmniej 3 godziny dziennie, czyli około 20 godzin
          tygodniowo.
        </>
      ),
    },
    {
      title: 'Co jeśli w trakcie kursu nie będę mógł uczestniczyć w teście sprawdzającym wiedzę?',
      content: (
        <>
          Testy sprawdzające wiedzę są obowiązkowe i nie posiadają drugich terminów. W związku z tym upewnij się, że
          dasz radę podejść do każdego z testów, sprawdzając ich terminy w {fullHarmonogram}.
        </>
      ),
    },
    {
      title: 'Czy można zrezygnować z kursu w jego trakcie? Z jakimi konsekwencjami to się wiąże?',
      content: (
        <>
          Jednym z naszych celów jest umożliwienie każdemu sprawdzenie się w roli programisty. W związku z tym, z kursu
          możesz zrezygnować w dowolnym momencie bez żadnych konsekwencji.
        </>
      ),
    },
    {
      title: 'Czy kurs jest płatny?',
      content: (
        <>
          Nie, cały kurs jest w pełni darmowy. W ramach materiałów odnajdziesz czasami polecane przez nas źródła, które
          są płatne, niemniej ich zakup nie jest wymagany do ukończenia kursu.
        </>
      ),
    },
    {
      title: 'Jak to jest możliwe, że kurs jest bezpłatny?',
      content: (
        <>
          Wierzymy, że każdy powinien zyskać szansę poznania branży IT bez konieczności błądzenia w setkach materiałów
          zamieszczonych w sieci, czy wydawania ogromnych kwot na kursy o niewiadomej jakości. Naszą wizję podzielają
          zarówno mentorzy, jak i osoby zajmujące się organizacją kursu, które angażują się w CodersCamp w pełni pro
          bono. Dodatkowo wszystkie koszty kursu, których nie da się uniknąć (np. utrzymanie serwerów, wykorzystywane
          narzędzia), pokrywane są przez naszych partnerów.
        </>
      ),
    },
    {
      title: 'Czy pomagacie w znalezieniu pracy po ukończeniu kursu?',
      content: (
        <>
          Podczas kursu możesz liczyć na wiele materiałów i szkoleń, które pomogą Ci w poszukiwaniu pracy. Dla
          najlepszych przewidujemy także konsultacje CV oraz próbne rozmowy rekrutacyjne. Innymi słowy, dajemy różne
          możliwości, których odpowiednie wykorzystanie zależy już tylko od Ciebie. Nie pośredniczymy w żaden sposób w
          znalezieniu dla Ciebie pracy.
        </>
      ),
    },
  ];
};
