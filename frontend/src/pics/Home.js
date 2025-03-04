import {connect} from 'react-redux'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import {pics} from '../redux/action/pics'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = ({pics_g, pics, q}) => {
    const [loading, setLoading] = useState(true)
    let url = ``

    if(q){
        url = `${process.env.REACT_APP_API_URL}/api-post/?q=${q}`
    }else{
        url = `${process.env.REACT_APP_API_URL}/api-post/`
    }

    useEffect(()=>{
        pics(url, setLoading)
    },[q])

    return(
        <Container className='mt-5'>
            {loading? <h1>Loading...</h1>: <></>}
            {pics_g && 
                <Row className=''>
                    {pics_g.map((post) => (
                        <Col xs={12} md={6} lg={3} xl={3} xxl={3} className='p-1 pic-t'>
                            <Link to={`/${post.id}`} className='article-2'>
                                <Card className='pic-l' key={post.id} style={{height: "100%"}}>
                                    <Card.Img variant="top" src={post.thumb} style={{height: "100% !important"}}/>
                                </Card>
                            </Link>
                        </Col>

                        // <div class="col-sm-12 col-md-12 col-lg-6 col-xl-4 p-4">
                        //     <a class="article-2" href="{{instance.get_absolute_url}}">
                        //     <image class="" src="{{instance.thumb.url}}"  style="max-width:100% ; max-height:300px ;min-width:100%; min-height:100%; width:100%; height:100%"></image>
                        //     </a>
                        // </div>
                      
                    ))}
                </Row>
            }
        </Container>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.pics,
})
export default connect(mapStateToProps, {pics}) (Home)