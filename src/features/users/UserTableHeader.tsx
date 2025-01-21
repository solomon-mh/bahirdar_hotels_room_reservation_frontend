function UserTableHeader() {
  return (
    <div className="mb-2 grid grid-cols-6 items-center gap-3 border-b border-slate-300 bg-slate-200 p-3">
      <div className="col-span-1 col-start-1">Profile</div>
      <div className="col-span-1 col-start-2">First Name</div>
      <div className="col-span-1 col-start-3">Last Name</div>
      <div className="col-span-1 col-start-4">Email</div>
      <div className="col-span-1 col-start-5">Phone number</div>
      <div className="col-span-1 col-start-6">Role</div>
    </div>
  );
}

export default UserTableHeader;
