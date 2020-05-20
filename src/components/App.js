import React from 'react';
import Header from './Header';
import ContestDetails from './ContestDetails';
import EachContest from './EachContest';
import ContestList from './ContestList';
import * as api from '../../allApi';
import PropTypes from 'prop-types';
//import axios from 'axios';

//using html history back
const pushState =(obj,url) =>
 window.history.pushState(obj,'',url);


// making react statefull components with dynamic values
class App extends React.Component{
    static propTypes= {
        initialData: PropTypes.object.isRequired
    }
    state=this.props.initialData;
    //   state= {
    //       //pageHeader:"Naming contests",
    //       contestList:this.props.initialContestList
    //   };
      //component life cycle method
      componentDidMount(){
          //do ajax call, timers, listeners
      }
      componentWillUnmount(){
        // clean timers, listeners
      }
      
      // to change url to slected content
      fetchContest=(contestId)=>{
          pushState(
              {
                selctedContestId:contestId
              },
            `/contestList/${contestId}`
          );

        api.fetchEachContestByID(contestId).then(contest =>{
            // set state as per selected contest
          this.setState({
           // pageHeader:contest.contestName,
            selctedContestId:contest.id,
            contestList:{
                ...this.state.contestList,
                [contest.id]:contest
            }
        });
        });
      
        //each data 
        // this.setState({
        //     pageHeader:this.state.contestList[contestId].contestName,
        //     selctedContestId:contestId,
        // }); 
      };

    getCurrentContest()
    {
        return this.state.contestList[this.state.selctedContestId];
    }
    getPageHeader()
    {
        if(this.getSelectedContestId())
        {
            return this.getCurrentContest().contestName;
        }
        return "Naming Contest"
    }
    getSelectedContestId()
    {
        return this.state.selctedContestId;
    }
      selctedContestContent(){
         if(this.state.selctedContestId){
             //just for testing
             /*return <ContestDetails
             key={this.state.selctedContestId} 
             onTestClick={this.fetchContest}
                    {...this.state.contestList[this.state.selctedContestId]}/>*/

                    return <EachContest
                    {...this.getCurrentContest()}
                    />
         }
         return <ContestList 
         onContestClick={this.fetchContest}
         contestList={this.state.contestList}/>
       
      }

    render(){
        return (
            <div className='App'>
              <Header message={this.getPageHeader()} />
              {/* <ContestList 
              onContestClick={this.fetchContest}
              contestList={this.state.contestList}/>
             */
            this.selctedContestContent()
            }
            </div>
        );
    }
}



export default App;