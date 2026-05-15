
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';
import { JSDOM } from 'jsdom';

// Mock browser environment for Three.js
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
            console.log("Mesh Names:");
            gltf.scene.traverse(node => {
                if (node.isMesh) {
                    console.log(`- ${node.name} (Parent: ${node.parent ? node.parent.name : 'none'})`);
                }
            });
        }, (err) => {
            console.error("Error parsing GLB:", err);
        });
    } catch (err) {
        console.error("Error reading file:", err);
    }
}

listMeshes('d:\\ortak\\antigravity\\hucreler\\optimized_bitki1.glb');
