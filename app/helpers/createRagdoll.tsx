interface Shape {
    color: string;
    args: [number, number, number];
    mass: number;
    position: [number, number, number];
  }
  
  interface Joint {
    bodyA: string;
    bodyB: string;
    pivotA: [number, number, number];
    pivotB: [number, number, number];
    axisA: [number, number, number];
    axisB: [number, number, number];
    angle: number;
    twistAngle?: number;
  }
  
  interface RagdollResult {
    shapes: {
      [key: string]: Shape;
    };
    joints: {
      [key: string]: Joint;
    };
  }
  
  export function createRagdoll(scale: number, angleA: number = 0, angleB: number = 0, twistAngle: number = 0): RagdollResult {
    const shouldersDistance = 0.45 * scale,
      upperArmLength = 0.4 * scale,
      lowerArmLength = 0.4 * scale,
      upperArmSize = 0.15 * scale,
      lowerArmSize = 0.15 * scale,
      neckLength = 0 * scale,
      headRadius = 0.28 * scale,
      upperBodyLength = 0.6 * scale,
      pelvisLength = 0.2 * scale,
      upperLegLength = 0.5 * scale,
      upperLegSize = 0.15 * scale,
      lowerLegSize = 0.15 * scale,
      lowerLegLength = 0.5 * scale
  
    // Lower legs
    const lowerLeftLeg: Shape = {
      color: 'lightblue',
      args: [lowerLegSize, lowerLegLength, lowerArmSize],
      mass: scale,
      position: [-shouldersDistance / 3, lowerLegLength / 2, 0]
    }
    const lowerRightLeg: Shape = {
      color: 'lightblue',
      args: [lowerLegSize, lowerLegLength, lowerArmSize],
      mass: scale,
      position: [shouldersDistance / 3, lowerLegLength / 2, 0]
    }
  
    // Upper legs
    const upperLeftLeg: Shape = {
      color: 'lightblue',
      args: [upperLegSize, upperLegLength, lowerArmSize],
      mass: scale,
      position: [-shouldersDistance / 3, lowerLeftLeg.position[1] + lowerLegLength / 2 + upperLegLength / 2, 0]
    }
    const upperRightLeg: Shape = {
      color: 'lightblue',
      args: [upperLegSize, upperLegLength, lowerArmSize],
      mass: scale,
      position: [shouldersDistance / 3, lowerRightLeg.position[1] + lowerLegLength / 2 + upperLegLength / 2, 0]
    }
  
    // Pelvis
    const pelvis: Shape = {
      color: 'lightblue',
      args: [shouldersDistance, pelvisLength, lowerArmSize],
      mass: scale,
      position: [0, upperLeftLeg.position[1] + upperLegLength / 2 + pelvisLength / 2, 0]
    }
  
    // Upper body
    const upperBody: Shape = {
      color: 'indianred',
      args: [shouldersDistance, upperBodyLength, lowerArmSize * 1.5],
      mass: scale,
      position: [0, pelvis.position[1] + pelvisLength / 2 + upperBodyLength / 2, 0]
    }
  
    // Head
    const head: Shape = {
      color: 'lightpink',
      args: [headRadius, headRadius, headRadius],
      mass: scale,
      position: [0, upperBody.position[1] + upperBodyLength / 2 + headRadius / 2 + neckLength, 0]
    }
  
    // Upper arms
    const upperLeftArm: Shape = {
      color: 'indianred',
      args: [upperArmLength, upperArmSize, upperArmSize],
      mass: scale,
      position: [-shouldersDistance / 2 - upperArmLength / 2, upperBody.position[1] + upperBodyLength / 2, 0]
    }
    const upperRightArm: Shape = {
      color: 'indianred',
      args: [upperArmLength, upperArmSize, upperArmSize],
      mass: scale,
      position: [shouldersDistance / 2 + upperArmLength / 2, upperBody.position[1] + upperBodyLength / 2, 0]
    }
  
    // lower arms
    const lowerLeftArm: Shape = {
      color: 'lightpink',
      args: [lowerArmLength, lowerArmSize, lowerArmSize],
      mass: scale,
      position: [upperLeftArm.position[0] - lowerArmLength / 2 - upperArmLength / 2, upperLeftArm.position[1], 0]
    }
    const lowerRightArm: Shape = {
      color: 'lightpink',
      args: [lowerArmLength, lowerArmSize, lowerArmSize],
      mass: scale,
      position: [upperRightArm.position[0] + lowerArmLength / 2 + upperArmLength / 2, upperRightArm.position[1], 0]
    }
  
    // joints
  
    // Neck joint
    const neckJoint: Joint = {
      bodyA: 'head',
      bodyB: 'upperBody',
      pivotA: [0, -headRadius - neckLength / 2, 0],
      pivotB: [0, upperBodyLength / 2, 0],
      axisA: [0, 1, 0],
      axisB: [0, 1, 0],
      angle: angleA,
      twistAngle: twistAngle
    }
  
    // Knee joints
    const leftKneeJoint: Joint = {
      bodyA: 'lowerLeftLeg',
      bodyB: 'upperLeftLeg',
      pivotA: [0, lowerLegLength / 2, 0],
      pivotB: [0, -upperLegLength / 2, 0],
      axisA: [0, 1, 0],
      axisB: [0, 1, 0],
      angle: angleA,
      twistAngle: twistAngle
    }
    const rightKneeJoint: Joint = {
      bodyA: 'lowerRightLeg',
      bodyB: 'upperRightLeg',
      pivotA: [0, lowerLegLength / 2, 0],
      pivotB: [0, -upperLegLength / 2, 0],
      axisA: [0, 1, 0],
      axisB: [0, 1, 0],
      angle: angleA,
      twistAngle: twistAngle
    }
  
    // Hip joints
    const leftHipJoint: Joint = {
      bodyA: 'upperLeftLeg',
      bodyB: 'pelvis',
      pivotA: [0, upperLegLength / 2, 0],
      pivotB: [-shouldersDistance / 3, -pelvisLength / 2, 0],
      axisA: [0, 1, 0],
      axisB: [0, 1, 0],
      angle: angleA,
      twistAngle: twistAngle
    }
    const rightHipJoint: Joint = {
      bodyA: 'upperRightLeg',
      bodyB: 'pelvis',
      pivotA: [0, upperLegLength / 2, 0],
      pivotB: [shouldersDistance / 3, -pelvisLength / 2, 0],
      axisA: [0, 1, 0],
      axisB: [0, 1, 0],
      angle: angleA,
      twistAngle: twistAngle
    }
  
    // Spine
    const spineJoint: Joint = {
      bodyA: 'pelvis',
      bodyB: 'upperBody',
      pivotA: [0, pelvisLength / 2, 0],
      pivotB: [0, -upperBodyLength / 2, 0],
      axisA: [0, 1, 0],
      axisB: [0, 1, 0],
      angle: angleA,
      twistAngle: twistAngle
    }
  
    // Shoulders
    const leftShoulder: Joint = {
      bodyA: 'upperBody',
      bodyB: 'upperLeftArm',
      pivotA: [-shouldersDistance / 2, upperBodyLength / 2, 0],
      pivotB: [upperArmLength / 2, 0, 0],
      axisA: [1, 0, 0],
      axisB: [1, 0, 0],
      angle: angleB
    }
    const rightShoulder: Joint = {
      bodyA: 'upperBody',
      bodyB: 'upperRightArm',
      pivotA: [shouldersDistance / 2, upperBodyLength / 2, 0],
      pivotB: [-upperArmLength / 2, 0, 0],
      axisA: [1, 0, 0],
      axisB: [1, 0, 0],
      angle: angleB,
      twistAngle: twistAngle
    }
  
    // Elbow joint
    const leftElbowJoint: Joint = {
      bodyA: 'lowerLeftArm',
      bodyB: 'upperLeftArm',
      pivotA: [lowerArmLength / 2, 0, 0],
      pivotB: [-upperArmLength / 2, 0, 0],
      axisA: [1, 0, 0],
      axisB: [1, 0, 0],
      angle: angleA,
      twistAngle: twistAngle
    }
    const rightElbowJoint: Joint = {
      bodyA: 'lowerRightArm',
      bodyB: 'upperRightArm',
      pivotA: [-lowerArmLength / 2, 0, 0],
      pivotB: [upperArmLength / 2, 0, 0],
      axisA: [1, 0, 0],
      axisB: [1, 0, 0],
      angle: angleA,
      twistAngle: twistAngle
    }
  
    return {
      shapes: {
        lowerLeftLeg,
        lowerRightLeg,
        upperLeftLeg,
        upperRightLeg,
        pelvis,
        upperBody,
        head,
        upperLeftArm,
        upperRightArm,
        lowerLeftArm,
        lowerRightArm
      },
      joints: {
        neckJoint,
        leftKneeJoint,
        rightKneeJoint,
        leftHipJoint,
        rightHipJoint,
        spineJoint,
        leftShoulder,
        rightShoulder,
        leftElbowJoint,
        rightElbowJoint
      }
    }
  }
  