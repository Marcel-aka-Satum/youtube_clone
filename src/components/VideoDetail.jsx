import React,{useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';    

import {Videos} from './imports'
import { fetchVideos } from '../api/fetchAPI';

const VideoDetail = () => {
  const {id} = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetchVideos(`videos?part=snippet,statistics&id=${id}`);
        setVideoDetail(res.items[0]);

        const res2 = await fetchVideos(`search?part=snippet&relatedToVideoId=${id}&type=video`);
        setVideos(res2.items);
      } catch (error) {
        console.error(error)
      }
    }
    fetchVideo();
  }, [id]);

  if(!videoDetail?.snippet) return 'Loading ...'; // if videoDetail is null, return 'Loading ...'
  const {snippet: {title, channelId, channelTitle}, statistics:{viewCount, likeCount}} = videoDetail; // destructuring
 
  return (
    <Box minHeight="95vh">
      <Stack direction={{xs:'column', md:'row'}}> 
        <Box flex={1}>
          <Box sx={{width:'100%', position:'sticky', top:'86px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls/>
            <Typography color="#fff" variant='h5' fontWeight="bold" padding={2}>{title}</Typography>
            <Stack direction="row" justifyContent="space-between" py={1} px={2} sx={{color:'#fff'}}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm:'subtitle1', md:'h6'}} color='#fff'>
                  {channelTitle}
                  <CheckCircle sx={{ fontSize:12, color:'gray', ml:'5px'}}/>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant='body1' sx={{opcaity:0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{opcaity:0.7}}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>

              </Stack>
            </Stack>
          </Box>
        </Box>
      <Box px={2} py={{md:1, xs:5}} justifyContent="center" alignItems="center">
        <Videos videos={videos} direction="column" />
      </Box>
      </Stack>

    </Box>
  )
}

export default VideoDetail
