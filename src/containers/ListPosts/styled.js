import styled, { keyframes } from 'styled-components'
import { withStyles } from '@material-ui/core/styles';



// export const StyledButton = withStyles({
//     root: {
//         // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//         background: '#ed7f61',
//         borderRadius: 3,
//         border: 0,
//         color: 'white',
//         height: 48,
//         padding: '0 30px',
//     },
//     label: {
//         textTransform: 'capitalize',
//     },
// })(Button);

// export const colors = keyframes` {
//     0% {
//         background-position: 0% 50%;
//     }
  
//     50%{
//         background-position: 100% 50%;
//     }
  
//     100%{
//         background-position: 0% 50%;
//     }
//   }
//   `



export const ContentWrapper = styled.div`
    max-width: 960px;
    margin: 0 auto;
  `

export const Body = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(90deg ,#c0c0aa ,#1cefff ) ;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: 150% 150%;
    animation: ${colors} 13s ease infinite;
   
  `

export const ProgressDiv = styled.div`
    display: flex;
    justify-content: center;
  `

//////////////////////////////post card components
export const PostCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    margin:auto;
    
    height: fit-content;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    box-sizing: border-box;
    margin-bottom: 30px;
    background-color: white;
    border-radius: 5px;
  `
export const CreatePost = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 500px;
    width: 30vw;
    height: fit-content;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    box-sizing: border-box;
    margin-bottom: 30px;
    background-color: white;
    border-radius: 5px;
    padding: 30px;
  `

//////////////////////post header components
export const PostHeader = styled.div`
    border-bottom: 2px solid #ed7f61;
    padding: 0px 10px 0px 10px;
    margin-bottom: 20px;
  `

//////////////////////post body components
export const PostContent = styled.div`
    height: fit-content;
    width: 90%;
    padding:20px;
    margin: auto;
    text-align: center;
    word-wrap: break-word;
  `

//////////////////////post footer components
export const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 2px solid  #ed7f61;
    padding: 6px 10px 3px 10px;
    margin-top: 20px;
  `
//////Thumbs Icons Div
export const PostLikeIcons = styled.div`
    display: flex;
    
  `
export const Icons = styled.h2`
    margin: 0px 10px 0px 10px;
    color: #878a8c;
  
  `
//////Icons Button
export const IconButton = styled.button`
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: initial;
    height: fit-content;
    outline: none;
  `

///////////////////////////////Header
export const HeaderComp = styled.div`
    width: 100%;
    height: 100px;
    background-color:  #ED7F61;
    display: flex;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;
    margin-bottom: 50px;
    justify-content: space-between;
  `
export const ImgLogo = styled.img`
    width: 120px;
  `

////////////////////////////Search Box
export const FatherDiv = styled.div`
    display: flex;
    align-items: center;
  `
export const SearchIconDiv = styled.div`
    margin-top: 25px;
  `

export const H5 = styled.h5`
  color: #636e72;
  `