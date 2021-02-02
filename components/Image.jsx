import NextImage from 'next/image';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PreviewWrapper = styled(ImageWrapper)`
  > div {
    width: 100%;
    height: 100%;
    filter: blur(8px);
  }
`;

export default function Image(props) {
  return (
    <>
      {/*<PreviewWrapper>
        <NextImage {...props} width="10" height="10" quality={10} objectFit="cover" />
      </PreviewWrapper>*/}
      <ImageWrapper>
        <NextImage {...props} layout="fill" objectFit="cover" />
      </ImageWrapper>
    </>
  );
}
