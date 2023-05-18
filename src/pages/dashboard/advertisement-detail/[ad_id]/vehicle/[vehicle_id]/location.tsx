import React, {useEffect, useRef, useState} from 'react';
import { getMapScriptTag, registerEvents } from '@src/helpers/map'
import { Button }  from 'react-bootstrap'
import { useSaveLocation } from '@src/apis/map';
import {toast} from "react-toastify";
import {dateFormat} from "@src/helpers";
import useDebouncedState from "@restart/hooks/useDebouncedState";
import { Drawer, Paper} from '@mui/material';
import { useRouter } from 'next/router';

const Map = () => {
    const { query } = useRouter();
    const { ad_id, vehicle_id } = query;

    const mapRef = useRef(null);
    const startInputRef = useRef(null);
    const endInputRef = useRef(null);
    const [savingRide,setSavingRide]=useState(false);
    const [showDrawer,setShowDrawer]=useState(false)
    const { mutateAsync: saveLocation } = useSaveLocation();
    const toggleDrawer =()=>{
        setShowDrawer(!showDrawer)
    }
    const handleStartRide = async (event: any) => {
        try {
            setSavingRide(true);
            event.preventDefault();
            const data = {
                cargo_vehicle_id: 1,
                starting_point: startInputRef.current.value,
                end_point: endInputRef.current.value,
                start_time: dateFormat(new Date()),
                end_time: dateFormat(new Date()),
                route_no: Date.now()
            }
            await saveLocation(data)
        } catch {
            setSavingRide(false);
        }
    };
    useEffect(() => {
        const mapScript=getMapScriptTag();
        registerEvents(mapScript,mapRef,startInputRef,endInputRef)
        document.head.appendChild(mapScript);
        return () => {
            document.head.removeChild(mapScript);
        };
    }, []);

    return (
        <div>
            <div>
                <input type="hidden" id="start" ref={startInputRef} />
                <input  type="hidden" id="end" ref={endInputRef} />
                <div id="button-container">
                    <Button
                        disabled={savingRide}
                        onClick={handleStartRide}
                        variant="primary"
                        className="bg-sky-500/100 absolute mt-[350px] ml-[450px] z-50">
                        Save Ride
                    </Button>
                </div>
            </div>
            <div>
            </div>
            <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default Map;