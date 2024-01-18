const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
const DisplayContext = React.createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdsv0Bt16GFEN7Ph0qpTs-LtzW6fVoAIM",
  authDomain: "fullstackbankapp.firebaseapp.com",
  projectId: "fullstackbankapp",
  storageBucket: "fullstackbankapp.appspot.com",
  messagingSenderId: "706429237779",
  appId: "1:706429237779:web:892cc45ee3ffa01b5f5de6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "25rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}