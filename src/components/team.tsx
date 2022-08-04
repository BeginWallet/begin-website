import { defineMessages } from 'react-intl'
import f from "../lib/translate";
import TeamAvatar from './team-avatar';

const messages = defineMessages({
  teamTitle: {
    id: 'team.title',
    defaultMessage: 'We are the Team building it for you'
  },
  teamBody: {
    id: 'team.body',
    defaultMessage: 'Our Team is building to use ourselves, which result in a high-quality product for you to use as well.'+
    '{br}'+
    'We\'re committed to delivering the best in software development bringing a vast background from Enterprise Software, Cloud Engineer and Cyber Security.'
  },
  teamRoleCoFounder: {
    id: 'team.role.cofounder',
    defaultMessage: 'Co-Founder'
  },
  teamRoleDeveloper: {
    id: 'team.role.developer',
    defaultMessage: 'Developer'
  },
  teamRoleDesigner: {
    id: 'team.role.designer',
    defaultMessage: 'Designer'
  },
  teamRoleAdvisor: {
    id: 'team.role.advisor',
    defaultMessage: 'Advisor'
  },
  teamDescriptionFrancis: {
    id: 'team.description.francis',
    defaultMessage: 'More than 20 years of experience in Software Development, working in projects in Africa, Americas and Europe.'
  },
  teamDescriptionFlavio: {
    id: 'team.description.flavio',
    defaultMessage: 'More than 20 years of experience in Backend Development, working in Enterprise tools for Manufacturing and Financial.'
  },
  teamDescriptionGabriel: {
    id: 'team.description.gabriel',
    defaultMessage: 'More than 11 years of experience in Software Development and Mobile specialist delivering cross-platform solutions.'
  },
  teamDescriptionNick: {
    id: 'team.description.nick',
    defaultMessage: 'UX Designer with a background in Motion Design and Graphic Design, and Crypto enthusiast.'
  },
})

const Team = () => {

  return (
    <section id="team" className="pt-10 -mt-10 lg:pt-20 lg:-mt-20">
      <div className="lg:mt-6">
        <div className="flex flex-wrap justify-center p-6">
          <h1 className="text-3xl lg:text-6xl font-medium leading-tight">
            {f(messages.teamTitle)}
          </h1>
        </div>
        {/* <div className="lg:ml-6 p-6 pt-2 lg:pt-6">
          <p className="text-base text-justify lg:text-left lg:mr-8">
          {f(messages.teamBody,{
              br: <><br/><br/></>              
            })}
          </p>
        </div> */}
      </div>
      <div className="p-6 lg:mt-6 grid grid-cols-1 md:grid-cols-4 md:col-gap-28 row-gap-0 md:row-gap-6 lg:mb-10">
        <TeamAvatar 
          name="Francis Luz"
          img="/images/francis.jpeg"
          role={f(messages.teamRoleCoFounder)}
          linkedin="francisluz"
          github="francisluz"
          description={f(messages.teamDescriptionFrancis)}
        />
        <TeamAvatar 
          name="Flavio Rasseli"
          img="/images/flavio.jpeg"
          role={f(messages.teamRoleCoFounder)}
          linkedin="frasseli"
          github="frasseli"
          description={f(messages.teamDescriptionFlavio)}
        />
        <TeamAvatar 
          name="Gabriel Guarnieri"
          img="/images/gabriel.jpeg"
          role={f(messages.teamRoleCoFounder)}
          linkedin="gabrielgc"
          github="gabrielgc"
          description={f(messages.teamDescriptionGabriel)}
        />
        <TeamAvatar 
          name="Nicholas Echols"
          img="/images/nicholas.jpeg"
          role={f(messages.teamRoleDesigner)}
          linkedin="nickechols"
          github="nickwechols"
          description={f(messages.teamDescriptionNick)}
        />
      </div>
    </section>
  )
}

export default Team
