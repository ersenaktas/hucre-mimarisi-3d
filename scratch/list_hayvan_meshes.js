
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.self = global;

const loader = new GLTFLoader();

async function listMeshes(filePath) {
    try {
        const data = fs.readFileSync(filePath);
        const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        
        loader.parse(arrayBuffer, '', (gltf) => {
            console.log("Mesh Names in " + filePath + ":");
            gltf.scene.traverse(node => {
                if (node.isMesh) {
                    console.log(`- ${node.name}`);
                }
            });
        }, (err) => {
            console.error("Error parsing GLB:", err);
        });
    } catch (err) {
        console.error("Error reading file:", err);
    }
}

listMeshes('d:\\ortak\\antigravity\\hucreler\\public\\optimized_hayvan.glb');
