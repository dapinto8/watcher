import Image from '../Image';
import styled from 'styled-components';

const Person = styled.div`
  position: relative;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;

  @media(min-width: 768px) {
    height: 270px;
  }
`;

const PersonName = styled.span`
  display: block;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
`;

export default function CastItem({ person }) {
  const image = person.profile_path
    ? `${process.env.IMAGES_URL}/w500${person.profile_path}`
    : '/icons/person-placeholder.png';

  return (
    <div>
      <Person>
        <Image
          src={image}
          alt={person.name}
        />
      </Person>
      <PersonName>{person.name}</PersonName>
    </div>
  );
}
