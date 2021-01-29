import styled from 'styled-components';

const Person = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const PersonName = styled.span`
  display: block;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
`;

export default function CastItem({ person }) {
  return (
    <div>
      <Person>
        <img
          src={
            person.profile_path
              ? `${process.env.IMAGES_URL}/w500${person.profile_path}`
              : '/icons/person-placeholder.png'
          }
          alt={person.name}
        />
      </Person>
      <PersonName>{person.name}</PersonName>
    </div>
  );
}
