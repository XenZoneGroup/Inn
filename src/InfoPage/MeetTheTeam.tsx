import * as React from 'react';
import axios from 'axios';

import { InfoPage } from './';

import { Header } from '../templates/components/Header';
import { Footer } from '../templates/components/Footer';

import './teamListStyles.scss';

interface TeamMember {
  nickname: string;
  aboutMe: string;
  therapiesOffered: string;
  qualifications: string;
  preferredProfessionalBodies: string;
}

const teamRequest = (page: number) =>
  `https://api-beta.kooth.com/meet-the-team?page=${page}&perPage=10&isBioPublic=asg%2FYoungPeople`;

interface TeamMemberListProps {
  person: TeamMember;
}

interface WhenProps {
  pred: () => boolean;
}

const When: React.FC<WhenProps> = ({ children, pred }) => {
  return pred() && <React.Fragment>{children}</React.Fragment>;
};

const TeamMemberList: React.FC<TeamMemberListProps> = ({ person }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const expandCollapse = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setExpanded(!expanded);
  };
  return (
    <li className={expanded ? 'expanded' : ''}>
      <h2>{person.nickname}</h2>
      <p className="bio">{person.aboutMe}</p>
      <When pred={() => expanded}>
        <h3>Training, qualifications and experience</h3>
        <p>{person.qualifications}</p>
        <h3>Therapies offered</h3>
        <p>{person.therapiesOffered}</p>
        <h3>Membership of professional bodies</h3>
        <p>{person.preferredProfessionalBodies}</p>
      </When>
      <a role="button" className="expand" href="#" onClick={expandCollapse}>
        {expanded ? 'Less' : 'More...'}
      </a>
      <hr />
    </li>
  );
};

interface TeamResults {
  team: TeamMember[];
  more: boolean;
  loading: boolean;
}

const EMPTY_TEAM_LIST: TeamMember[] = [];
const EMPTY_TEAM_RESULTS = {
  team: EMPTY_TEAM_LIST,
  more: false,
  loading: true,
};

const MeetTheTeam: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [teamResults, setTeamResults] = React.useState<TeamResults>(
    EMPTY_TEAM_RESULTS
  );
  const [errored, setErrored] = React.useState<boolean>(false);

  const next = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setTeamResults(EMPTY_TEAM_RESULTS);
    setPage(page + 1);
  };

  const previous = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (page === 1) return;
    setTeamResults(EMPTY_TEAM_RESULTS);
    setPage(page - 1);
  };

  React.useEffect(() => {
    const getTeamData = async () => {
      try {
        window.scrollTo(0, 0);
        const result = await axios.get(teamRequest(page));
        const response = result.data;
        const hasMore =
          response.meta.offset * response.meta.limit < response.meta.count;
        setTeamResults({
          team: response.results,
          more: hasMore,
          loading: false,
        });
      } catch (e) {
        setErrored(true);
      }
    };

    getTeamData();
  }, [page]);

  const advance = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPage(page + 1);
  };

  return (
    <React.Fragment>
      <Header />
      <InfoPage title="Kooth in Association with SOME_PARTNER | Meet the team">
        <h1>Meet the Team</h1>
        {teamResults.loading && (
          <div className="loading-box">
            <span className="spinner"></span>Loading
          </div>
        )}
        {errored && (
          <span>
            Sorry, we couldn't load the team page right now. Try refreshing the
            page in a few moments.
          </span>
        )}
        <ul className="team-list">
          {teamResults.team.map((result: TeamMember, i: number) => (
            <TeamMemberList key={i} person={result} />
          ))}
        </ul>
        {teamResults.more && (
          <a href="#" className="paginate" onClick={next}>
            Next
          </a>
        )}
        {page > 1 && (
          <a href="#" className="paginate" onClick={previous}>
            Back
          </a>
        )}
      </InfoPage>
      <Footer />
    </React.Fragment>
  );
};

export { MeetTheTeam };
