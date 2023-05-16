import login from './login.module.css';

export default function LoginPage() {
  return (
    <div className={login.containerLogin}>
      <h1>Welcome!</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          password:
          <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
