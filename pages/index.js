import React from 'react';

const Page = () => {
  return <div></div>;
};

export async function getServerSideProps() {
  const content = null;

  if (!content) {
    return {
      redirect: {
        permanent: false,
        destination: '/seminar',
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Page;
