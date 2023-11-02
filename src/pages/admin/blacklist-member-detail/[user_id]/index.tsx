import MemberDetail from "@src/components/pages/Admin/MemberDetail";

// Pass the blackList prop when using MemberDetail as blacklist page
const MemberDetailPage = () => {
  return (
      <MemberDetail blackList={true} />
  );
};

export default MemberDetailPage;