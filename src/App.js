
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/actions";
import { withRouter } from "react-router";
import Main from "./Main";
import './App.css';

function mapStateToProps(state) {
    return {
        user: state.user,
        UI: state.UI,
        rides: state.data
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

/**
 * Main Application component connected to redux actions and props
 */
const App =
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Main);

export default App;