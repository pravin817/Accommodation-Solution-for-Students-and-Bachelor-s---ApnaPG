const CreateUserProfile = () => {
  return (
    <div>
      <form>
        <div className="flex flex-col">
          <input type="text" placeholder="Enter the First Name" className=""/>
          <input type="text" placeholder="Enter the Last Name" />
        </div>
      </form>
    </div>
  );
};

export default CreateUserProfile;
