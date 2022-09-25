import GlobalLayout from '@common/bridges/GlobalLayout';
import Exerist from '@specifics/exerist/bridges';

function ExeristPage() {
  return (
    <GlobalLayout isShowHeader>
      <Exerist />
    </GlobalLayout>
  );
}

export default ExeristPage;
