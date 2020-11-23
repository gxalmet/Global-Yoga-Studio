/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
//import Select from 'react-select';
import { yogaList } from '../../constants/yogaConstants';
import { languagesList } from '../../constants/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { teacherCreateAction, teacherDetailsUserAction, teacherUpdateAction } from '../../actions/teachersActions';
import './TeacherProfileScreen.css';
import ImageBox from '../../components/image/ImageBox';

export default function TeacherProfileScreen() {
    const dispacth = useDispatch();
    const userSignIn = useSelector((state)=>state.userSignIn);
    const { userInfo } = userSignIn;

    const initialState = ''; 
    const initialArrayState = [];
    const [name, setName] = useState(initialState);
    const [country, setCountry] = useState(initialState);
    const [img, setImg] = useState(initialState);
    const [place, setPlace] = useState(initialState);
    const [languages, setLanguages] = useState(initialArrayState);
    const [remote, setRemote] = useState(initialState);
    const [type, setType] = useState([]);
    const [urlYoutube, setUrlYoutube] = useState(initialState);
    const [urlInstagram, setUrlInstagram] = useState(initialState);
    const [des, setDes] = useState(initialState);

    const teacherProfileCreate = useSelector((state)=>state.teacherProfileCreate);
    const { loading, error, teacher: teacherCreated } = teacherProfileCreate;

    
    const teacherProfileRead = useSelector((state)=>state.teacherProfileRead);
    const { loading: loadingRead, error: errorRead, teacher: teacherRead } = teacherProfileRead;

    const teacherProfileUpdate = useSelector((state)=>state.teacherProfileUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = teacherProfileUpdate;

    const submitHandler = async (e) => {
        e.preventDefault();
        // const bodyFormData = new FormData();
        // bodyFormData.append('myFile', img);
        // debugger;
        // try {
        //     const { data } = await Axios.post('http://localhost:3700/api/files/upload', bodyFormData, {
        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //         Authorization: `Bearer ${userInfo.token}`,
        //       },
        //     });
        //     console.log(data.file.id);
        //     setImg(data.file.id);
        //     // setLoadingUpload(false);
        // } catch (error) {
        //     // setErrorUpload(error.message);
        //     // setLoadingUpload(false);
        // }
        dispacth(teacherUpdateAction(teacherRead._id, name, country, img, place, languages, remote, type, urlYoutube, urlInstagram, des));
        
    }
    const handleChangeLanguages = (e) => {
        var tmpLang = languages;
        var item = tmpLang.find(x=>x===e.target.value);
        if(!item){
            tmpLang.push(e.target.value);
        }else{
            var filteredAry = tmpLang.filter(e => e !== item)
            tmpLang = filteredAry;
        }
        
        setLanguages(tmpLang);
        
    }
    const handleChangeTypes = (e) => {
        
        var tmpType = type;
        var item = tmpType.find(x=>x===e.target.value);
        if(!item){
            tmpType.push(e.target.value);
        }else{
            var filteredAry = tmpType.filter(e => e !== item)
            tmpType = filteredAry;
        }
        
        setType(tmpType);

    }
    const createTeacherProfile = (e) => {
        console.log("teacherCreated");
        console.log(teacherCreated);

            dispacth(teacherCreateAction(userInfo._id));

        
    }
    const handleChangeImg = async (e) => {
        const file = e.target.files[0];
        setImg(URL.createObjectURL(file));
        const bodyFormData = new FormData();
        bodyFormData.append('myFile', file);

        try {
            const { data } = await Axios.post('http://localhost:3700/api/files/upload', bodyFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
              },
            });
            setImg(data.file.id)
            // setLoadingUpload(false);
        } catch (error) {
            // setErrorUpload(error.message);
            // setLoadingUpload(false);
        }
    }
    useEffect(() => {
        
        if(loadingRead === false ){
            if(teacherRead){
                setName(teacherRead.name);
                setCountry(teacherRead.country);
                setImg(teacherRead.img);
                setPlace(teacherRead.place);
                setLanguages(teacherRead.languages); 
                setRemote(teacherRead.remote); 
                setType(teacherRead.type);
                setUrlYoutube(teacherRead.urlYoutube);
                setUrlInstagram(teacherRead.urlInstagram);
                setDes(teacherRead.des);
            }

        }else{
            dispacth(teacherDetailsUserAction(userInfo._id));
        }
        
    }, [dispacth, loadingRead, teacherRead, userInfo._id]);

    console.log("teacherRead");
    console.log(teacherRead);
    if(teacherRead === null){
        return (
            <div className="form">
                <label ></label>
                <button className="primary" onClick={createTeacherProfile}>Create teacher Profile</button>
            </div>
        );
    }else{
        return (
            <div>
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>Teacher profile</h1>
                    </div>
                    { loading && ( <LoadingBox variant='info'>Loading Create...</LoadingBox> )}
                    { loadingRead && ( <LoadingBox variant='info'>Loading in read process...</LoadingBox> )}
                    { loadingUpdate && ( <LoadingBox variant='info'>Loading in update process...</LoadingBox> )}
                    { error && ( <MessageBox variant='danger'>{error}</MessageBox> ) } 
                    { errorRead && ( <MessageBox variant='danger'>{errorRead}</MessageBox> ) } 
                    { errorUpdate && ( <MessageBox variant='danger'>{errorUpdate}</MessageBox> ) } 
                    { successUpdate && ( <LoadingBox variant='info'>Update succesfull!!!</LoadingBox> )}
                    <div>
                        <ImageBox
                            imageID={img}
                            clas="teacher-detail-img"
                            alt="teacher"></ImageBox>
                        <div>
                            <input type="file" onChange={handleChangeImg}/>
                            
                            {/* <img src={img} className="teacher-detail-img" alt="Your Awesome Image"/> */}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                            id="name"
                            required={true} 
                            defaultValue = {name}
                            onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <input type="text" 
                            id="country"
                            required={true} 
                            defaultValue = {country}
                            onChange={(e)=>setCountry(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="place">Place</label>
                        <input type="text" 
                            id="place"
                            required={true} 
                            defaultValue = {place}
                            onChange={(e)=>setPlace(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="languages">Languages</label>
                        
                        <select 
                            id="type" 
                            multiple={true}
                            onChange={handleChangeLanguages} 
                            value={languages}>
                                {languagesList.map((langItem,j)=>{
                                    return <option key ={j} value={langItem.value}>{langItem.label}</option>    
                                })}
                            
                        </select>
                        
                    </div>
                    <div>
                        <label htmlFor="remote">Remote</label>
                        <input type="checkbox" 
                            id="remote"
                            defaultValue = {remote}
                            onChange={(e)=>setRemote(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="type">Type</label>
                        <select 
                            id="type" 
                            multiple={true}
                            onChange={handleChangeTypes} 
                            value={type}>
                                {yogaList.map((yogaItem,i)=>{
                                    return <option key ={i} value={yogaItem.value}>{yogaItem.label}</option>    
                                })}
                            
                        </select>
                    </div>
                    <div>
                        <label htmlFor="type">urlInstagram</label>
                        <input type="text" 
                            id="type"
                            defaultValue = {urlInstagram}
                            onChange={(e)=>setUrlInstagram(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="type">urlYoutube</label>
                        <input type="text" 
                            id="type"
                            defaultValue = {urlYoutube}
                            onChange={(e)=>setUrlYoutube(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="type">description</label>
                        <textarea
                            id="description"
                            defaultValue = {des}
                            rows="4" cols="50"
                            onChange={(e)=>setDes(e.target.value)}/>
                    </div>
                    <div>
                        <label ></label>
                        <button className="primary" type="submit">Save profile</button>
                    </div>
                </form>
            </div>
        );
    }
    
}

