import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components_admin/Layout";

const DeleteAdminPage = () => {
  const router = useRouter();
  const { id } = router.query;

  async function deleteAdmin() {
    await axios.delete(`/api/deleteAdmin?id=${id}`);
    router.push('/admin/adminList')
  }

  
    return (
      <Layout>
        <h1 className="text-center">Do you really want to delete this admin?</h1>
        <div className="flex gap-2 justify-center">
          <button className="btn-red" onClick={deleteAdmin}>
            Yes
          </button>
          <button className="btn-default" onClick={() => router.push('/admin/adminList')}>
            No
          </button>
        </div>
      </Layout>
    );
  };
  
  export default DeleteAdminPage;