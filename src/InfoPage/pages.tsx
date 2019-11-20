import * as React from 'react';

import { InfoPage } from './';

import { Header } from '../templates/components/Header';
import { Footer } from '../templates/components/Footer';

import './styles.scss';
import samaritans from '../images/services/samaritans.png';
import childline from '../images/services/childline.png';
import police from '../images/services/police.png';
import nhsChoices from '../images/services/nhs-choices.png';
import reportAbuse from '../images/services/report-abuse.png';

const InfoForParents : React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <InfoPage title="Kooth in Association with CABA | Information for Parents">
        <h1>Information for Parents</h1>
        <p>Kooth is an anonymous and confidential online service to help young people with any problems they may have. Young people can access support through counselling sessions, messages, and their peers via the pre-moderated discussion boards, weekly live forums, and magazine articles.</p>
        <p>If you need any further information or support please contact: <a href="mailto:parents@xenzone.com">parents@xenzone.com</a></p>
      </InfoPage>
      <Footer />
    </React.Fragment>
  );
}

const AboutKooth : React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <InfoPage title="Kooth in Association with CABA | Information for Parents">
        <h1>About Kooth</h1>
        <p>Kooth is anonymous and confidential online service to help you with any problems you may have. You can ask for advice on our discussion boards with other young people and help others with their questions too, read magazine articles, and take part in our weekly live forums. You can speak to our lovely online counselling team for further, private support through our chat service or messages.</p>
      </InfoPage>
      <Footer />
    </React.Fragment>
  );
}

const crisisServices : ServiceProps[] = [
  {
    name: 'Samaritans',
    href: 'HTTP://WWW.SAMARITANS.ORG/',
    description: 'Talk to us any time you like, in your own way, and off the record – about whatever’s getting to you. You don’t have to be suicidal.',
    image: samaritans,
  },
  {
    name: 'Childline',
    href: 'HTTP://WWW.CHILDLINE.ORG.UK',
    description: 'Childline is yours – a free, private and confidential service where you can be you. Whatever your worry, whenever you need help, however you want to get in touch. We\'re here for you online, on the phone, anytime.',
    image: childline,
  },
  {
    name: 'Police',
    href: 'HTTP://WWW.POLICE.UK',
    description: 'Do you think a crime has been commited? Your local police force will be able to help you.',
    image: police,
  },
  {
    name: 'NHS Choices',
    href: 'HTTP://WWW.NHS.UK/NHSENGLAND/ABOUTNHSSERVICES/MENTAL-HEALTH-SERVICES-EXPLAINED/PAGES/ACCESSING%20SERVICES.ASPX',
    description: 'Mental health services are free on the NHS. Click here to find out more about the services available to you.',
    image: nhsChoices,
  },
  {
    name: 'Report Abuse',
    href: 'HTTPS://WWW.CEOP.POLICE.UK/SAFETY-CENTRE',
    description: 'CEOP help children stay safe online. Has someone acted inappropriately towards you online, or to a child or young person you know? It may be sexual chat, being asked to do something that makes you feel uncomfortable or someone being insistent on meeting up. You can report it here.',
    image: reportAbuse,
  },
]

interface ServiceProps {
  name: string;
  href: string;
  description: string;
  image: string;
}

const ServiceDetails : React.FC<ServiceProps> = ({ name, href, description, image }) => {
  return (
    <React.Fragment>
    <hr/>
    <li>
      <div className="service-details">
        <h2>{ name }</h2>
        <h3><a href={ href }>{ href }</a></h3>
        <p>{ description }</p>
      </div>
      <div className="service-image reveal-on-desktop">
        <a href={ href }><img src={ image } /></a>
      </div>
    </li>
    </React.Fragment>
  );
}

const InCrisis : React.FC = () => {
  return (
    <React.Fragment>
      <Header />
        <InfoPage title="Kooth in Association with CABA | Crisis Services">
          <h1>In Crisis</h1>
          <p>Sometimes our thoughts and feelings can be so overwhelming that it may feel like things can never change - there are always options and always things to try which can help you feel differently.</p>

          <p>If you need urgent support you can you can contact any of these services.</p>

          <p>If you do not feel like you can keep yourself safe you need to call an ambulance or present at your local A and E department. At the hospital you can request a mental health assessment. Your safety is our concern.</p>
          <ul className="crisis-list">
            { crisisServices.map((s : ServiceProps, i : number) => <ServiceDetails {...s} key={ i } />) }
          </ul>
        </InfoPage>
      <Footer />
    </React.Fragment>
  );
};

const PrivacyAndSafety : React.FC = () => {
  return (
    <React.Fragment>
      <Header />
        <InfoPage title="Kooth in Association with CABA | Privacy and Safety">
          <h1>Privacy and Safety</h1>
          <p>
             At Kooth we take the privacy and safety of our users very seriously.
             We have written this document to tell you:
          </p>
          <ul>
            <li>What information (data) we collect</li>
            <li>How we use it</li>
            <li>How long we store it</li>
            <li>Your rights with regard to the information you share with us</li>
          </ul>

          <h2>Your Data, Your Rights</h2>
          <p>When you sign up to Kooth you give us some basic information. This information is called “data”.</p>
          <p>This data tells us how many young people have registered with Kooth and also their year of birth, gender, ethnicity and the area where they live. This information is stored securely on our servers and is anonymous and encrypted. (Coded which ensures your data is protected)</p>
          <p>We use this data to measure how we are performing as a service and to improve our service. This includes working with researchers from universities who get ethical approval for their work.</p>
          <p>For Kooth to be able to improve its services, we need to work with universities and NHS organisations to help us analyse our data.</p>
          <p>We may also share your data with the company/companies that provided you with access to the service. Any data shared will be anonymous and securely transferred, and will help inform the company/companies about usage of the service, including, but not limited to:</p>
          <ul>
            <li>Number of registrations</li>
            <li>Site usage</li>
            <li>Issues faced by service users</li>
            <li>Outcomes achieved</li>
          </ul>
          <p>We store and share this data safely and completely anonymously, and follow all legal requirements for this. No identifiable information will ever be shared outside of our organisation for research purposes.</p>
          <p>If you want to find out more information about how we use data for research please contact us at research@xenzone.com.</p>

          <h3>This data does NOT enable us to</h3>
          <ul>
            <li>Identify an individual user</li>
            <li>Trace or find an individual</li>
          </ul>
          <p>We do not ask any young person, at the point of registration, for any information that may identify them.</p>

          <h3>Case studies</h3>
          <p>We are asked by the people who pay for the service, the funders, to provide them with anonymous monthly case studies of our work with young people. The funders use the case studies to see how well Kooth is doing in supporting you.</p>
          <p>Counsellors also have to take part in ongoing training and development so that they can be best placed and trained to support you. This means that they sometimes also have to write case studies for their courses or training. Whenever a case study is written, we never use any information that may identify you. It will never be possible to identify you from these case studies.</p>

          <h3>Referral from Kooth to external services</h3>
          <p>Sometimes getting extra help for you can be really helpful . Depending on where you live you may be given the option of a referral to another service in your area. These services may be operated by Kooth or a partner organisation.</p>
          <p>If you choose to self-refer to one of these services through the Kooth platform you will be asked to give us your personal details: your name(s), address, phone number and date of birth. This information/data is called <em>Personally Identifiable Information or PII for short</em>.</p>
          <p>Your PII will be stored on the Kooth system and is only accessible to the Kooth Team and the organisation you are being referred to. The counsellor will seek your consent to pass over your details, although we will ‘act’ to protect you without your consent if necessary or if you are unable to give consent. We will always let you know who we are passing details to and would work with you to agree every step we may take and why, if this is appropriate to do so.</p>

          <h3>Safeguarding</h3>
          <p>If we are really worried about you and think that you are at risk or danger, we will talk to you about the need for somebody outside the Kooth team to know what has happened or what is happening to you.</p>

          <h4>We would only do this if</h4>
          <ul>
            <li>Your life is at risk because of something you are doing</li>
            <li>You are at risk from somebody else</li>
            <li>You are a risk to somebody else</li>
          </ul>
          <p>In these cases, your counsellor will ask you for your contact details so that they can refer you to the appropriate services or get the help you need.</p>
          <p>Your PII will be stored on the Kooth system and is only accessible to the Kooth Team and the organisation you are being referred to.</p>
          <p>We will always:</p>
          <ul>
            <li>Seek your consent to pass over your details, although we will act to protect you if you are at risk of harm, if you tell us something which means you could pose a risk to others or if you are unable to give consent</li>
            <li>Let you know who we are passing details to and why</li>
            <li>Keep you informed of any actions we intend to take</li>
            <li>Where possible, we will work with you to agree every step taken</li>
          </ul>

          <h2>Your right to withdraw consent</h2>
          <p>As with adults all young people have the right to withdraw consent if you have shared any personal identifiable information with us and we are able to identify you. You can withdraw your consent to share information at anytime. A request to withdraw consent should be sent to Judy Happe who is our Data Protection Officer.</p>
          <p>The contact email address is <a href="mailto:DPO@mindzonegroup.com">DPO@mindzonegroup.com</a></p>

          <h2>The right to view the data we hold about you</h2>
          <p>Children and young people have the same rights as adults to see what data is kept about them. If you want to view your records at Kooth, you can do so by messaging our Data Protection Officer. The contact email address is <a href="mailto:DPO@mindzonegroup.com">DPO@mindzonegroup.com</a></p>
          <p>We can only show you your data if we know who you are and you can provide proof of your ID.</p>
          <p>Because your data is sensitive and may be triggering we don’t post out data to children and young people, but will invite you into our office in Manchester or London, so that a trained counsellor can provide support to you while you view your data.</p>
          <p>Further information and frequently asked questions can be accessed via the links below.</p>
          <ul>
            <li><a href="www.kooth.com/further.html">Further Information</a></li>
            <li><a href="www.kooth.com/faqs.html">Frequently Asked Questions</a></li>
          </ul>
          <p><em>If you have any other questions do not hesitate to speak to a member of the team via our message or chat functionalities.</em></p>
        </InfoPage>
      <Footer />
    </React.Fragment>
  )
};

const TermsOfUse : React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <InfoPage title="Kooth in Association with CABA | Terms of Use">
        <h1>Terms and Conditions</h1>
        <h2>Keeping yourself safe</h2>
        <ul>
          <li>Please make sure that the information you give us is accurate. This includes the area where you live and the year and month you were born. If you have entered your information incorrectly by mistake, please let one of the counsellors know so that they can advise you what to do.</li>
          <li>Keep your account private- don’t show anyone your password or share your account with someone else.</li>
          <li>Don’t use your full name or surname, give out details of specific locations like the name of your school or a place you like to go to with your friends or share details such as email addresses or your phone number.</li>
        </ul>

        <h3>Respect Others</h3>
        <ul>
          <li>Be polite to other Kooth members and the Kooth team</li>
          <li>Show each other kindness; rude or offensive comments won’t be published</li>
          <li>Be sensitive to others and remember that things you say may impact on them</li>
          <li>Don’t bully or be unkind to other Kooth members or talk in a violent or aggressive way</li>
          <li>Make sure your language is appropriate- try not to use swear words or use sexually explicitlanguage. Anything that is homophobic or racist won’t be published</li>
          <li>It’s important to be truthful on Kooth and not pretend to be someone else</li>
          <li>Sometimes you might feel cross or frustrated but it’s important to try not to take it out on the Kooth team or other members on the site</li>
        </ul>

        <h3>Some topics are sensitive</h3>
        <p>You might hear the word ‘trigger’ used on Kooth, a trigger is something that can set off memories, emotions or feelings in someone else. It’s hard to avoid every possible trigger but there are some common things that shouldn’t be posted on Kooth as they might trigger others. These topics are best spoken about with Kooth counsellors who are trained to support you.</p>
        <ul>
          <li>Eating disorders- we won’t publish height, weight or BMI calculations, posts that are pro eating disorder or competitive, descriptions of ED behaviours or details and quantities of food in relation to ED behaviours</li>
          <li>Self-harm- we won’t publish any posts that contain details of methods of self-harm or descriptions of self-harm injuries</li>
          <li>Feeling suicidal- we won’t publish anything that talks about suicidal plans</li>
          <li>Experiences of abuse or trauma- details of experiences of abuse and trauma are best discussed with counsellors, you can share with others your stories of overcoming difficult events but we won’t be able to publish any specific details</li>
          <li>Legal stuff- we won’t be able to post anything that talks about a criminal offence or criminal behaviour.</li>
        </ul>

        <h3>Publishing and downloads</h3>
        <p>On Kooth, everything that you post or submit to the site is checked by staff members who moderate what you’ve written and make sure it doesn’t break any of the community boundaries.</p>
        <ul>
          <li>Sometimes a moderator might delete your post or change it slightly before it is posted, whoever moderates what you’ve written will message you to let you know if your post can’t be published</li>
          <li>Documents on the site may be downloaded and used for personal, non-commercial use only.</li>
          <li>All rights are reserved; no part of Kooth, including information, images, photos, trademarks & logos may be copied, republished, posted, broadcast or reproduced in any form whatsoever without our prior written permission from Xenzone.</li>
          <p>These terms may be changed from time to time to ensure we are able to keep our users safe and comply with the law. We will notify you we change these terms. If you continue to use the site after we have changed the terms, then you are assumed to have accepted the changes</p>
          <p>Kooth is run by Xenzone Limited. You can find out more information about Kooth by visiting the Xenzone Website. <a href="http://xenzone.com">http://xenzone.com</a></p>
        </ul>
      </InfoPage>
      <Footer />
    </React.Fragment>
  );
}

export {
  InfoForParents,
  InCrisis,
  AboutKooth,
  PrivacyAndSafety,
  TermsOfUse,
}
